'use client'
import React,{useEffect, useState} from 'react'
import { supabase } from "@/utils/supabase";
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

const Present = () => {
    const router = useRouter();
    const [session, setsession] = useState<any>("");

    const func = async()=>{
      const { data: { user } } = await supabase.auth.getUser()
      console.log("Session got "+data);
      console.log(error);
      setsession(data);
      return data;
    }

    useEffect(()=>{
      console.log(session);
    },[session])

    useEffect(()=>{
      func()
    },[])

    const logOutFun = async()=>{
        signOut();
        router.push("/app.secure/login")
    }

    
  return (
    <div>
        <div>
        <button type="submit" onClick={logOutFun} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log out</button>
    </div>
    </div>
  )
}

export default Present