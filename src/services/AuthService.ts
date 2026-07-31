import { createClient } from "@/lib/supabase/server";
import { UserRepository } from "@/repositories/UserRepository";

export class AuthService {
  static async getCurrentUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    return UserRepository.findById(user.id);
  }
}
