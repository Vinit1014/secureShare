'use client'
import { supabase } from "@/utils/supabase"
import React, { useState,useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from "next-auth";
import Inbox from "@/components/Inbox";
import SendFile from "@/components/SendFile";

const Present = () => {
    const [email,setEmail] = useState<any>(null);
    const [fetchError,setFetchError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectS,setSelectS] = useState(true);
    const [user, setUser] = useState<User|null>(null);
    const supa = createClientComponentClient();

    const [selectedEmail,setSelectedEmail] = useState<any>();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        console.log(selectS);
    },[selectS])
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
        },1000)
    },[user])

    console.log({loading, user})

    useEffect(()=>{
        console.log(email);
    },[email])
    
    const changeType = ()=>{
        setSelectS(true);
    }

    const changeType1 = ()=>{
        setSelectS(false);
    }
    return (
        <>
            <div className='grid grid-cols-2 mx-36 mt-20 border-2 border-grey-200 rounded-lg cursor-pointer'>
                <div onClick={changeType} className={selectS ? "p-2 mr-4 bg-green-300 rounded-lg font-bold text-green-900  text-center": " p-2 font-bold rounded-lg text-green-900  text-center"} >Send File</div>
                <div onClick={changeType1} className={selectS ? "p-2 rounded-lg font-bold text-green-900  text-center": "p-2 font-bold bg-green-300 rounded-lg text-green-900  text-center"}>Inbox</div>
            </div>
            <div className=" border-2 border-red-400 mx-36 h-96 rounded-md shadow-md grid grid-cols-3">
                {/* <h1 className="border-blue-400 border-2">Welcome</h1> */}
                {selectS ? 
                    <SendFile/>
                :
                <>
                    <Inbox/>
                </>
                    }
                
            </div>
        </>
    )
}

export default Present
