'use-client'

import { supabase } from "@/utils/supabase"
import React, { useState,useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from "next-auth";
import Fileselect from "./Fileselect";

const SendFile = () => {

    const [email,setEmail] = useState<any>(null);
    const [fetchError,setFetchError] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User|null>(null);
    const supa = createClientComponentClient();

    const [selectedEmail,setSelectedEmail] = useState<any>();
    const [searchTerm, setSearchTerm] = useState('');
    
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


    const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
    };
    
    const filteredEmails = email?.filter((email: { email: string; }) =>
        email.email.toLowerCase().includes(searchTerm.toLowerCase())
    );   

    const selectedEmailFun = (em:any)=>{
        // console.log("Selectedddddd "+em);
        setSelectedEmail(em);
        setSearchTerm('')
    }

    return (
    <>
        <div className="border-purple-400 border-2">
            <input placeholder="Search for sender's email" className="w-72 border-gray-200 border-2 p-1 m-2 ml-4 focus:outline-none shadow-md focus:border-gray-300 focus:border-2 rounded-md" value={searchTerm} onChange={handleSearchChange}/>
                    {searchTerm && 
            <ul className="p-1 w-72 m-2 ml-4 shadow-md">
            {filteredEmails.map((email: { id: React.Key | null | undefined;  email: string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <li className="p-1  m-0 cursor-pointer" key={email.id} onClick={()=>{selectedEmailFun(email.email)}}>
                {email.email}
                <hr></hr>
                </li>
            ))}
                            
            </ul>}
        </div>
        <div className="border-blue-400 border-2 w-full col-span-2">
                <h1 className="font-bold m-2 p-1">To {selectedEmail}</h1>
                    <Fileselect sender={user} email={selectedEmail}/>
                        {/* <h1>Hello</h1> */}
        </div>      
    </>
  )
}

export default SendFile