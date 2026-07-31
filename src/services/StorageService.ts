import { StorageRepository } from "@/repositories/StorageRepository";

export class StorageService {
  static async uploadImage(bucket: string, file: File, folder?: string) {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const path = folder ? `${folder}/${fileName}` : fileName;
    
    return StorageRepository.uploadFile(bucket, path, file);
  }
}
