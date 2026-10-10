import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    accessToken?: string;
    address?: string;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      address?: string;
    } & DefaultSession["user"];

    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    accessToken?: string;
    address?: string;
  }
}