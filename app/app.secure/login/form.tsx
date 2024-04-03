'use client'
import { Button, ButtonGroup } from '@chakra-ui/react'
import React,{useState} from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth'
import { authOptions, loginPush } from '@/lib/auth';

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin = ()=>{
        signIn("google");
        // loginPush()
        router.push('/app.secure')
    }
    
    return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
        <form className="space-y-6" action="#" method="POST">
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
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
            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
            </div>
        </div>
        
        <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
        </form>
            <div className='m-4'>
                <p className="text-center text-sm text-gray-500 mx-36 my-4">Or else</p>
                <button type="submit" onClick={handleGoogleLogin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in with Google</button> 
            </div>
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