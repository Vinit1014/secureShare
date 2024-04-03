import { authOptions } from "@/lib/auth";
// import nextAuth from "next-auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}