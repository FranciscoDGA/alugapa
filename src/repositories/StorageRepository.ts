import { createClient } from "@/lib/supabase/server";

export class StorageRepository {
  static async uploadFile(bucket: string, path: string, file: File) {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    return data;
  }
}
