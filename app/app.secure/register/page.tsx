"use client"
// import { supabase } from "@/lib/supabase";
// import React from 'react'
// import Registerform from './form'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [privateKey, setPrivateKey] = useState('');
    const supabase = createClientComponentClient();

    useEffect(() => {
        generatePrivateKey();
    }, []);

    useEffect(() => {
        console.log(privateKey);
    }, [privateKey]);

    const generatePrivateKey = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let privateKey = '';
        const keyLength = 8;
        for (let i = 0; i < keyLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            privateKey += characters.charAt(randomIndex);
        }
        setPrivateKey(privateKey);
        console.log(privateKey);
    };

    const handleSignUp = async () => {
        if (!email || !password) {
            toast.error("Email and password cannot be empty.");
            return;
        }

        toast.info("Registering, please wait...");

        const res = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        });
        
        router.refresh();
        setEmail('');
        setPassword('');
        try {
            await fetch("/api/authe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    private_key: privateKey
                }),
            });
            toast.success("Registration done.");
        } catch (error) {
            console.log(error);
            toast.error("Registration failed.");
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="text-center font-bold text-3xl">SecureShare</h1>
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)}
                            value={email} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                        <input id="password" onChange={(e) => setPassword(e.target.value)} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                            value={password} />
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSignUp}>Register</button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link
                        href="/app.secure/login"
                        className="font-semibold text-gray-500 transition-colors hover:text-black"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Page;
