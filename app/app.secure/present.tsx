'use client'
import { supabase } from "@/utils/supabase"
import React, { useState,useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from "next-auth";
import Inbox from "@/components/Inbox";
import SendFile from "@/components/SendFile";
import { toast } from 'sonner';
import { Copy } from 'lucide-react';


const Present = () => {
    const [email,setEmail] = useState<any>(null);
    const [privateKey, setPrivateKey] = useState<any>('');
    const [changeP,setChangeP] = useState(false);
    const [toastShown, setToastShown] = useState(false);

    const [fetchError,setFetchError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectS,setSelectS] = useState(true);
    const [user, setUser] = useState<User|null>(null);
    const supa = createClientComponentClient();

    useEffect(()=>{
        console.log(selectS);
    },[selectS])

    useEffect(()=>{
        async function getUser(){
            const { data: { user } } = await supa.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        getUser();    
        // toast.success("Hello")
    }, []);
    
    useEffect(()=>{
        if (changeP && privateKey && !toastShown) {
            toast('Use this private key to download files', {
                description: 'Private key is ' + privateKey[0]?.private_key ,
            });
            // description:(
            //     <div>
            //         <span>Private key is {privateKey[0]?.private_key}</span>
            //         <Copy />
            //     </div>
            // ),
            setToastShown(true);
        }
    }, [changeP, privateKey, toastShown]);
    
    useEffect(()=>{
        if (user) {
            setTimeout(async () => {
                try {
                    const { data: privateKeyData, error: privateKeyError } = await supabase
                        .from('User')
                        .select('private_key')
                        .eq('email', user.email);
                    
                    if (privateKeyError) {
                        setFetchError('Could not fetch private key');
                        console.error("Could not fetch private key", privateKeyError);
                    } else {
                        setPrivateKey(privateKeyData);
                        setChangeP(true);
                    }
                    
                    const { data: emailData, error: emailError } = await supabase
                        .from('User')
                        .select('email')
                        .neq('email', user.email);
                    
                    if (emailError) {
                        setFetchError('Could not fetch email data');
                        console.error("Could not fetch email data", emailError);
                    } else {
                        setEmail(emailData);
                    }
                } catch (error) {
                    console.error('Error fetching data', error);
                }
            }, 1000);
        }
    }, [user]);

    console.log({loading, user})

    useEffect(()=>{
        console.log(email);
    },[email])
    
    useEffect(()=>{
        console.log(privateKey);
    },[privateKey])

    const changeType = ()=>{
        setSelectS(true);
    }

    const changeType1 = ()=>{
        setSelectS(false);
    }

    return (
        <>
            
            <div className='grid grid-cols-2 mx-36 mt-20 rounded-lg cursor-pointer'>
                <div onClick={changeType} className={selectS ? "border-2 border-grey-200 text-xl p-2 mr-1 bg-blue-100 rounded-lg font-bold text-blue-900  text-center": "mr-1 border-2 border-grey-200 text-xl p-2 font-bold rounded-lg text-blue-900  text-center"} >Send File</div>
                <div onClick={changeType1} className={selectS ? "border-2 border-grey-200 p-2 rounded-lg font-bold text-blue-900 text-xl text-center": "border-2 border-grey-200 p-2 font-bold bg-blue-100 rounded-lg text-blue-900 text-xl text-center"}>Inbox</div>
            </div>
            <div className="  mx-36 h-96 rounded-md shadow-xl grid grid-cols-3">
                {/* <h1 className="border-blue-400 border-2">Welcome</h1> */}
                {selectS ? 
                    <SendFile/>
                :
                <>
                    <Inbox loggedUser={user?.email}/>
                    {/* <Copy /> */}
                </>
                    }
                
            </div>
        </>
    )
}

export default Present
