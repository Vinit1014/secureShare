'use-client'

import { Button } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/utils/supabase';
import { Toaster, toast } from 'sonner';

const Fileselect = ({ sender, email }) => {
    const [currentSender, setCurrentSender] = useState(sender?.email);
    const [currentEmail, setCurrentEmail] = useState(email);
    const [prS,setPrs] = useState<any>('');
    const [prR,setPrR] = useState<any>('');
    const [file, setFile] = useState<any>();
    const fileInputRef = useRef(null);
    // const [combine,setCombine] = useState<any>('');

    useEffect(()=>{
        console.log("Sender private key is "+prS[0]?.private_key);
    },[prS])

    useEffect(()=>{
        console.log("Reciever private key is "+prR[0]?.private_key);
    },[prR])

    useEffect(() => {
        setCurrentSender(sender?.email);
    }, [sender]);

    useEffect(() => {
        setCurrentEmail(email);
        
    }, [email]);
    
    const setURLP = async () => {
        try {
            const { data: privateKeyData, error: privateKeyError } = await supabase
                .from('User')
                .select('private_key')
                .eq('email', currentSender);

            if (privateKeyError) {
                console.error("Could not fetch private key", privateKeyError);
            } else {
                setPrs(privateKeyData);
            }

            const { data: privateKeyData1, error: privateKeyError1 } = await supabase
                .from('User')
                .select('private_key')
                .eq('email', currentEmail);

            if (privateKeyError1) {
                console.error("Could not fetch private key", privateKeyError1);
            } else {
                setPrR(privateKeyData1);
            }

        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        if (currentSender && currentEmail) {
            setURLP();
        }
    }, [currentEmail, currentSender]);

    const handleFileSelect = async(e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0];
        setFile(file);
        // console.log(file);
    };
    
    const sendFileFun = async()=>{
        if (!file) {
            toast.error("No file selected");
            return;
        }

        if (prR=="") {
            toast.error("Select the sender to whom you want to send")  
            return; 
        }
        else{

            const {data,error} = await supabase
            .storage
            .from('bucket')
            .upload(prR[0]?.private_key+prS[0]?.private_key+'/'+file.name,file)
    
            try {
                await fetch("/api/sentfile",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                        send_file_to: currentEmail,
                        sender:currentSender 
                    }),
                })
            } catch (error) {
                console.log(error);
            }
    
            if (data) {
                toast.success('Successfully sent')
                setFile(null);
                setCurrentEmail("")
                fileInputRef.current.value = "";
            }
            else{
                toast.error("Error sending file")
                console.log(error);        
            }
        }
    }

    return (
        <div className='border-2 w-72 h-72 m-12 mx-44'>
            <Toaster richColors  />
            <p className="font-bold text-xl mx-6 p-1">Upload the file to send</p>
            <input
                ref={fileInputRef}
                className="mx-1 my-4 block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                type="file"
                onChange={handleFileSelect}
                accept=".pdf, .doc, .docx, .txt"
            />
            <Button onClick={sendFileFun} className='mx-20 w-28' colorScheme='blue' variant='solid' size='sm'>
                Send
            </Button>
            <p>{currentEmail}</p>
        </div>
    );
};

export default Fileselect;
