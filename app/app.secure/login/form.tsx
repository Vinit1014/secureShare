'use client'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';

const LoginForm = () => {
    const router = useRouter();
    // const supabase = createClientComponentClient();
    const [errorState, setErrorState] = useState("");
    const [formData,setFormData] = useState({
      email:"",
      password:""
    });
    
    const signIn = async()=>{
        const { data, error } = await supabase.auth.signInWithPassword({
          email: String(formData.email),
          password: String(formData.password),
        })
        console.log(data);
        setErrorState("Incorrect "+error);
        console.log("Errorrr is "+error);
    }

    // const handleGoogleLogin = ()=>{
    //     signIn("google");
    //     router.push('/app.secure')
    // }

    const getSessi = async()=>{
        const { data, error } = await supabase.auth.getSession()
        console.log("Session data is "+data);
        console.log(error);
        
    }

    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        console.log("Submitted");
        
        try{
          await fetch("/api/authe",{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              email: formData.email,
              password: formData.password,
                }),
            })
            signIn().then(()=>{
                getSessi(); 
                router.push('/app.secure');
            });
        }
        catch(error){
          console.log(error);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errorState && (
            <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
            {errorState}
            </span>
        )}
        <form className="space-y-6" action="#" method="POST">
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
            <input id="email" name="email" type="email" autoComplete="email" onChange={handleChange} value={formData.email} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
            </div>
        </div>
        <div>
            <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
            </div>
            <div className="mt-2">
            <input id="password" name="password" type="password" onChange={handleChange}value={formData.password} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/> 
            </div> 
        </div>
        
        <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>Sign in</button>
        </div>
        </form>
            {/* <div className='m-4'>
                <p className="text-center text-sm text-gray-500 mx-36 my-4">Or else</p>
                <button type="submit" onClick={handleGoogleLogin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in with Google</button> 
            </div> */}
            <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
                href="/app.secure/register"
                className="font-semibold text-gray-500 transition-colors hover:text-black"
            >
                Sign up
            </Link>
            </p>
        </div>
    </div>
  )
}

export default LoginForm;