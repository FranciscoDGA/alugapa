-- MIGRATION: 00001_sprint_02_foundation.sql
-- DESCRIPTION: Sets up Supabase Storage Buckets and RLS policies for the Prisma Schema

-- 1. Create Buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('avatars', 'avatars', true),
  ('company-logo', 'company-logo', true),
  ('company-banner', 'company-banner', true),
  ('equipment-images', 'equipment-images', true),
  ('documents', 'documents', false),
  ('review-images', 'review-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Policies
-- Avatars (Public Read, Auth Write)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Company Logos and Banners (Public Read, Auth Write)
CREATE POLICY "Public Access Company" ON storage.objects FOR SELECT USING (bucket_id IN ('company-logo', 'company-banner'));
CREATE POLICY "Auth Insert Company" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('company-logo', 'company-banner') AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update Company" ON storage.objects FOR UPDATE USING (bucket_id IN ('company-logo', 'company-banner') AND auth.role() = 'authenticated');

-- Equipment Images (Public Read, Auth Write)
CREATE POLICY "Public Access Equipment" ON storage.objects FOR SELECT USING (bucket_id = 'equipment-images');
CREATE POLICY "Auth Insert Equipment" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'equipment-images' AND auth.role() = 'authenticated');

-- Documents (Private Read, Auth Write)
CREATE POLICY "Private Access Documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Insert Documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- 3. Enable RLS on Prisma Tables (Optional, since Prisma uses Service Role, but good for direct API access if used in future)
ALTER TABLE "Company" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Company" ON "Company" FOR SELECT USING (true);
-- Note: complex update policies depending on "CompanyMember" would be added here if not using Prisma for mutations.
