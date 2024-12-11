import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Verifica las credenciales contra la base de datos o cualquier lógica necesaria
        if (credentials?.email === "admin@example.com" && credentials.password === "password123") {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }
        return null; // Devuelve null si las credenciales son inválidas
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Usa JWT para las sesiones
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
