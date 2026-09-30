import { supabase } from "./supabase.js";
import { SUPABASE_STORAGE_BUCKETS } from "./config.js";

const MAX_PASSPORT_BYTES = 5 * 1024 * 1024;
const ALLOWED_PASSPORT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const FILE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const PROFILE_PHOTOS_BUCKET = SUPABASE_STORAGE_BUCKETS.PROFILE_PHOTOS;
const PASSPORT_BUCKET = SUPABASE_STORAGE_BUCKETS.PASSPORT;
const PRIVATE_PHOTO_PREFIX = "supabase-storage://";

function buildStoragePath(file, folder) {
  return `${folder}/${crypto.randomUUID()}.${FILE_EXTENSIONS[file.type]}`;
}

/**
 * Upload a passport image to Supabase Storage.
 *
 * Signup uploads are private and write-only for anonymous users. Signed-in
 * profile uploads use the user's folder in the private profile-photos bucket.
 */
export async function uploadPassport(file) {
  if (!ALLOWED_PASSPORT_TYPES.has(file.type)) {
    throw new Error("Upload a JPG, PNG, or WebP passport photograph.");
  }
  if (file.size > MAX_PASSPORT_BYTES) {
    throw new Error("Passport photograph must be 5 MB or smaller.");
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const isAuthenticated = !userError && !!userData?.user;
  const bucket = isAuthenticated ? PROFILE_PHOTOS_BUCKET : PASSPORT_BUCKET;
  const folder = isAuthenticated ? userData.user.id : "signup";
  const path = buildStoragePath(file, folder);

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    const message = String(error.message || "").toLowerCase();
    if (message.includes("bucket") || message.includes("not found")) {
      throw new Error(
        "Supabase Storage is not configured. Apply migration 0021_passport_storage.sql, then retry.",
      );
    }
    throw error;
  }

  return `${PRIVATE_PHOTO_PREFIX}${bucket}/${path}`;
}

export async function resolvePhotoUrl(value) {
  return (await resolvePhotoUrls([value]))[0];
}

export async function resolvePhotoUrls(values) {
  const resolved = values.map((value) =>
    value ? toDriveImageUrl(value) : null,
  );
  const groupedPaths = new Map();

  values.forEach((value, index) => {
    const match = value?.match(
      /^supabase-storage:\/\/(passport-photos|profile-photos)\/(.+)$/,
    );
    if (!match) return;
    const entries = groupedPaths.get(match[1]) || [];
    entries.push({ path: match[2], index });
    groupedPaths.set(match[1], entries);
  });

  await Promise.all(
    [...groupedPaths].map(async ([bucket, entries]) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrls(
          entries.map((entry) => entry.path),
          60 * 60,
        );
      entries.forEach((entry, index) => {
        resolved[entry.index] = error ? null : data?.[index]?.signedUrl || null;
      });
    }),
  );

  return resolved;
}

/**
 * Supabase URL values are already usable in img src attributes. Old Google Drive
 * URLs are kept compatible for legacy records stored before the migration.
 */
export function toDriveImageUrl(url) {
  if (!url) return null;
  const match = String(url).match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
  return match
    ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`
    : url;
}
