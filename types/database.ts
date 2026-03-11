export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: "student" | "admin";
          created_at: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          university: string;
          year: string;
          major: string;
          instagram: string | null;
          bio: string | null;
          student_verified_at: string | null;
          created_at: string;
        };
      };
    };
  };
}

