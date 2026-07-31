import { createClient } from './client'

export function getPublicImageUrl(bucket: string, path: string | null) {
  if (!path) return null
  
  // Se já for uma URL completa (ex: de uma migração antiga), retorna direto
  if (path.startsWith('http')) return path

  const supabase = createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  
  return data.publicUrl
}

// Helpers para buckets específicos
export const getEquipmentImage = (path: string | null) => getPublicImageUrl('equipment-images', path)
export const getCompanyLogo = (path: string | null) => getPublicImageUrl('company-logo', path)
export const getCompanyCover = (path: string | null) => getPublicImageUrl('company-cover', path)
