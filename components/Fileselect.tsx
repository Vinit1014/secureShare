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
    const fileInputRef = useRef<any>(null);
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
        <div className='shadow-xl shadow-gray-400 w-96 h-72 m-12 mx-48 flex flex-col items-center'>
            <Toaster richColors />
            <p className="font-bold text-blue-900 text-xl p-2 m-2 text-center">Upload the file to send</p>
            {currentEmail && <p className='text-blue-900'>To {currentEmail}</p>}
            <input
                ref={fileInputRef}
                className=" shadow-lg rounded-md p-2 my-4 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-500 file:text-white
                hover:file:bg-blue-800 cursor-pointer"
                type="file"
                onChange={handleFileSelect}
                accept=".pdf, .doc, .docx, .txt"
            />
            <Button onClick={sendFileFun} className='w-28' colorScheme='blue' variant='solid' size='sm'>
                Send
            </Button>
        </div>

    );
};

export default Fileselect;
