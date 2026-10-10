import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "My Login",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "ENTER YOUR EMAIL",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "ENTER YOUR PASSWORD",
        },
      },

      async authorize(credentials) {
        console.log("========== AUTHORIZE ==========");
        console.log("EMAIL:", credentials?.email);
        console.log("API:", process.env.NEXTAUTH_API);

        const response = await fetch(
          `${process.env.NEXTAUTH_API}/auth/signin`,
          {
            method: "POST",

            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API STATUS:", response.status);

        const payload = await response.json();

        console.log("API RESPONSE:", payload);

        if (!response.ok) {
          return null;
        }

        if (!payload.token) {
          console.log("NO TOKEN FOUND");
          return null;
        }

        const userData: { id: string } = jwtDecode(payload.token);

        console.log("USER DATA:", userData);

        return {
          id: userData.id,
          email: payload.user.email,
          name: payload.user.name,
          accessToken: payload.token,
        };
      },
    }),
  ],

  // success login, user refresh, get session
 callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.accessToken = user.accessToken;
    }

    console.log("token", token);

    return token;
  },

  async session({ session, token }) {
    if (token) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
    }

    return session;
  },
},

  pages: {
    signIn: "/login",
  },
};