"use-client"
import React, { useEffect, useState } from 'react'
import { Download } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { Toaster, toast } from 'sonner';

const Inbox = ({loggedUser}) => {

    const [logUser,setLogUser] = useState(loggedUser)
    const [inbox, setInbox] = useState<any>();
    const [prS,setPrS] = useState<any>('')
    const [prR,setPrR] = useState<any>('')
    const [fileArray,setFileArray] = useState<any>([]);
    const [link, setLink] = useState<any>('');

    useEffect(()=>{
        console.log(fileArray);
    },[fileArray])

    useEffect(()=>{
        console.log("The link is "+link);
        
    },[link])

    useEffect(()=>{
        console.log("Sender private key is "+prS[0]?.private_key);
    },[prS])

    useEffect(()=>{
        console.log("Reciever private key is "+prR[0]?.private_key);
    },[prR])

    useEffect(()=>{
        console.log(inbox);
    },[inbox])

    useEffect(()=>{
        setLogUser(loggedUser)
    },[loggedUser])

    useEffect(()=>{
        console.log("Hello here I am "+logUser);
    },[logUser])

    const fetchInbox = async()=>{
        try{
            let { data: DataFetch, error:ErrorFound } = await supabase
            .from('User')
            .select('sent_files_to')
            .eq('email',logUser)

            if (ErrorFound) {
                console.log("Error while fetching inbox "+ErrorFound);
            }
            else{
                if (DataFetch && DataFetch.length>0) {
                    setInbox(DataFetch[0].sent_files_to)
                }
            }

        }catch(error){
            console.log("Error while performing the task "+error);
        }
    }

    useEffect(()=>{
        if (logUser) {
            fetchInbox()
        }
    },[])

    useEffect(() => {
        if (prS.length > 0 && prR.length > 0) {
            fetchFiles(prS[0].private_key, prR[0].private_key);
        }
    }, [prS, prR]);

    const fetchPrivateKeys = async (email) => {
        try {
            const { data: privateKeyData, error: privateKeyError } = await supabase
                .from('User')
                .select('private_key')
                .eq('email', logUser);

            if (privateKeyError) {
                console.error("Could not fetch sender's private key", privateKeyError);
            } else {
                setPrS(privateKeyData);
            }

            const { data: privateKeyData1, error: privateKeyError1 } = await supabase
                .from('User')
                .select('private_key')
                .eq('email', email);

            if (privateKeyError1) {
                console.error("Could not fetch receiver's private key", privateKeyError1);
            } else {
                setPrR(privateKeyData1);
            }
        } catch (error) {
            console.error('Error fetching private keys', error);
        }
    };

    const fetchFiles = async (senderPrivateKey:any, receiverPrivateKey:any) => {
        try {
            const { data, error } = await supabase
                .storage
                .from('bucket')
                .list(receiverPrivateKey + senderPrivateKey);

            if (error) {
                console.log("Error fetching files: ", error);
            } else {
                if(data && data.length>0){
                    setFileArray(data);
                }
            }
        } catch (error) {
            console.error('Error fetching files', error);
        }
    };

    const handleClick = async(email:any)=>{
        console.log("Clicked " + email);
        fetchPrivateKeys(email);
    }

    const handleDownload = async(name:any)=>{
        console.log("Clicked "+name);
        console.log(`${prR[0].private_key}`+`${prS[0].private_key}`+`/${name}`);
        
        // const loadingToastId = toast.loading('Downloading...');
        const { data } = supabase
        .storage
        .from('bucket')
        .getPublicUrl(`${prR[0].private_key}`+`${prS[0].private_key}`+`/${name}`,{
            download: true
        })
        // .getPublicUrl('IbNdiJvfJjxumScf'+'/try1.txt',{
        //     download: true
        // })

        if (data) {
            // toast.dismiss(loadingToastId);
            setLink(data.publicUrl)
            toast.success("Downloaded successfully")
            console.log('Download link set');            
        }
    }
    
    return (
        <>
            <div className="border-purple-400 border-2">
                <Toaster richColors/>
                <ul className="p-1 w-84 m-4 shadow-md border-2 border-red-950">
                    {inbox && inbox.map((name:any,index:number)=>{
                        return(
                            <li onClick={()=>handleClick(name)} key={index} className="p-2 m-0 cursor-pointer border-2 border-blue-400">
                                {name}
                                <hr></hr>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="border-blue-400 border-2 w-full col-span-2">
                    {fileArray && fileArray.map((name:any,index:number)=>{
                        return(
                            <>
                                <div key={index} className='border-2 p-4 border-red-400 flex justify-between'>
                                    {name.name}
                                    <div onClick={()=>{(handleDownload(name.name));
                                    }}>
                                        <a href={link} download><Download/></a>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                
            </div>   
    </>
  )
}

export default Inbox
