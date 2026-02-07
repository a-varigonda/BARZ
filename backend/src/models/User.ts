export interface User {
    id: string;               // auth.users UUID
    email: string | null;
    username?: string | null;
    createdAt: string;        // ISO string from Supabase
  }
  
  
  // Temporary in-memory "database"
  export const users: User[] = [];
  