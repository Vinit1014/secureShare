'use-client'
import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Fileselect = (props:any) => {

    const handleFileSelect = (e: { target: { files: any[]; }; })=>{
        const file = e.target.files[0];
        console.log(file);
    }

    const [email,setEmail] = useState<any>(props.email);

    useEffect(()=>{
        setEmail(props.email)
        console.log("Emaill issss "+email);
    },[email])
    
    return (
        <div className='border-2 w-72 h-72 m-12 mx-44'>
            <p className="font-bold text-xl mx-6 p-1">Upload the file to send</p>
            <input
            className="mx-1 my-4 block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
            type="file"
            onChange={handleFileSelect}
            //   placeholder='Select'
            accept=".pdf, .doc, .docx, .txt" // Define accepted file types
            />
            {/* <p>Send file abc to </p> */}
            <Button className='mx-20 w-28' colorScheme='blue' variant='solid' size='sm'>
                Send
            </Button>
            <p>{email}</p>
        </div>
    )
}

export default Fileselect
