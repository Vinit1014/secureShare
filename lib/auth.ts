import GoogleProvider from "next-auth/providers/google";
import {NextAuthOptions, getServerSession} from "next-auth"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const authOptions:NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        })
      ],
      adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
      }),
      debug: true
}

export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/app.secure/login");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/app.secure/login");
  }
}

export async function loginPush(){
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/app.secure")
  }
  else{
    console.log("Loading");
  }
}
