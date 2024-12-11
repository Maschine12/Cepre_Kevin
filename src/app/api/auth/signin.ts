// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Lógica para autenticar usuario
        if (credentials?.username === "user" && credentials.password === "password123") {
          return { id: "1", name: "User", email: "user@example.com" }; // Usuario simulado
        }
        return null; // Retorna null si las credenciales no son válidas
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default authOptions;
