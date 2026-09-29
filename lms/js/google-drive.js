import { supabase } from "./supabase.js";

const MAX_PASSPORT_BYTES = 5 * 1024 * 1024;
const ALLOWED_PASSPORT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const PROFILE_PHOTOS_BUCKET = "profile-photos";
const PASSPORT_BUCKET = "passport-photos";

function sanitizeFileName(fileName) {
  const base = (fileName || "passport").replace(/\.[^.]+$/, "");
  const clean = base.replace(/[^a-zA-Z0-9_-]+/g, "_").replace(/^_+|_+$/g, "");
  return (clean || "passport") + `_${Date.now()}`;
}

function buildStoragePath(file, email) {
  const safeName = sanitizeFileName(file.name);
  const extension = (file.name.split(".").pop() || "jpg").toLowerCase();
  return `${safeName}.${extension}`;
}

/**
 * Upload a passport image to Supabase Storage.
 *
 * If the user is already signed in, store it in the private profile-photos bucket.
 * During signup, the user is not yet authenticated, so the upload falls back to a
 * public passport-photos bucket that must be created in the Supabase dashboard.
 */
export async function uploadPassport(file, email) {
  if (!ALLOWED_PASSPORT_TYPES.has(file.type)) {
    throw new Error("Upload a JPG, PNG, or WebP passport photograph.");
  }
  if (file.size > MAX_PASSPORT_BYTES) {
    throw new Error("Passport photograph must be 5 MB or smaller.");
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const isAuthenticated = !userError && !!userData?.user;
  const bucket = isAuthenticated ? PROFILE_PHOTOS_BUCKET : PASSPORT_BUCKET;
  const folder = isAuthenticated ? userData.user.id : encodeURIComponent((email || "guest").toLowerCase());
  const path = `${folder}/${buildStoragePath(file, email)}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    const message = String(error.message || "").toLowerCase();
    if (message.includes("bucket") || message.includes("not found")) {
      throw new Error(
        "Supabase storage is not configured yet. Create a public bucket named 'passport-photos' in the Storage dashboard, then retry.",
      );
    }
    throw error;
  }

  if (isAuthenticated) {
    const { data, error: signedUrlError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 60 * 60 * 24 * 7);

    if (!signedUrlError && data?.signedUrl) {
      return data.signedUrl;
    }
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (!data?.publicUrl) {
    throw new Error("Passport upload succeeded but a public URL could not be generated.");
  }

  return data.publicUrl;
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
