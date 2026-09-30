insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'passport-photos',
  'passport-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Signed-in users can view profile photos" on storage.objects;
drop policy if exists "Owners and staff can view profile photos" on storage.objects;
drop policy if exists "Authenticated users can view profile photos" on storage.objects;
create policy "Authenticated users can view profile photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'profile-photos');

drop policy if exists "Anonymous signup passport uploads" on storage.objects;
create policy "Anonymous signup passport uploads"
  on storage.objects for insert
  to anon
  with check (
    bucket_id = 'passport-photos'
    and (storage.foldername(name))[1] = 'signup'
  );

drop policy if exists "Owners and staff can view passport photos" on storage.objects;
drop policy if exists "Authenticated users can view passport photos" on storage.objects;
create policy "Authenticated users can view passport photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'passport-photos');

drop function if exists public.get_public_profiles(uuid[]);
create function public.get_public_profiles(p_profile_ids uuid[])
returns table (
  id uuid,
  full_name text,
  role text,
  profile_photo_url text
)
language sql
security definer
set search_path = public
stable
as $$
  select p.id, p.full_name, p.role, p.profile_photo_url
  from public.profiles p
  where p.id = any(p_profile_ids)
    and public.is_approved_member();
$$;

revoke execute on function public.get_public_profiles(uuid[]) from public;
grant execute on function public.get_public_profiles(uuid[]) to authenticated;