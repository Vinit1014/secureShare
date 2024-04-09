'use client'
import { supabase } from "@/utils/supabase"
import React, { useState,useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from "next-auth";

const Present = () => {
    const [email,setEmail] = useState<any>(null);
    const [fetchError,setFetchError] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User|null>(null);
    const supa = createClientComponentClient();
    useEffect(()=>{
        async function getUser(){
            const {data: {user}} = await supa.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        getUser();   
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            const fetchEmail = async()=>{
                // console.log("User is "+user);
                
                let { data, error } = await supabase
                .from('User')
                .select('email')
                // .neq('email', 'qwert@gmail.com')
                .neq('email', user?.email)
    
                console.log(data);
                
                if (error) {
                    setFetchError('Could not fetch data')
                    console.log("Could not fetch "+error);
                }
    
                if (data) {
                    setEmail(data)
                }
            }
    
            fetchEmail();
        },3000)
    },[user])

    console.log({loading, user})

    useEffect(()=>{
        console.log(email);
    },[email])

    return (
        <div>present</div>
    )
}

export default Present