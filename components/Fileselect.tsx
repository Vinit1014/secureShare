// 'use client'

// import { Button } from '@chakra-ui/react';
// import React, { useEffect, useState, useRef } from 'react';
// import { supabase } from '@/utils/supabase';
// import { toast } from 'sonner';

// const Fileselect = ({ sender, email }) => {
//     const [currentSender, setCurrentSender] = useState(sender?.email);
//     const [currentEmail, setCurrentEmail] = useState(email);
//     const [prS,setPrs] = useState<any>('');
//     const [prR,setPrR] = useState<any>('');
//     const [file, setFile] = useState<any>();
//     const fileInputRef = useRef<any>(null);
//     // const [combine,setCombine] = useState<any>('');

//     useEffect(()=>{
//         console.log("Sender private key is "+prS[0]?.private_key);
//     },[prS])

//     useEffect(()=>{
//         console.log("Reciever private key is "+prR[0]?.private_key);
//     },[prR])

//     useEffect(() => {
//         setCurrentSender(sender?.email);
//     }, [sender]);

//     useEffect(() => {
//         setCurrentEmail(email);
        
//     }, [email]);
    
//     const setURLP = async () => {
//         try {
//             const { data: privateKeyData, error: privateKeyError } = await supabase
//                 .from('User')
//                 .select('private_key')
//                 .eq('email', currentSender);

//             if (privateKeyError) {
//                 console.error("Could not fetch private key", privateKeyError);
//             } else {
//                 setPrs(privateKeyData);
//             }

//             const { data: privateKeyData1, error: privateKeyError1 } = await supabase
//                 .from('User')
//                 .select('private_key')
//                 .eq('email', currentEmail);

//             if (privateKeyError1) {
//                 console.error("Could not fetch private key", privateKeyError1);
//             } else {
//                 setPrR(privateKeyData1);
//             }

//         } catch (error) {
//             console.error('Error fetching data', error);
//         }
//     };
    
//     useEffect(() => {
//         if (currentSender && currentEmail) {
//             setURLP();
//         }
//     }, [currentEmail, currentSender]);

//     const handleFileSelect = async(e: { target: { files: any[]; }; }) => {
//         const file = e.target.files[0];
//         setFile(file);
//         // console.log(file);
//     };
    
//     const sendFileFun = async () => {
//         if (!file) {
//             toast.error("No file selected");
//             return;
//         }
    
//         if (prR === "") {
//             toast.error("Select the sender to whom you want to send");
//             return;
//         } else {
//             const uploadPromise = async () => {
//                 const { data, error } = await supabase
//                     .storage
//                     .from('bucket')
//                     .upload(prR[0]?.private_key + prS[0]?.private_key + '/' + file.name, file);
    
//                 if (error) {
//                     throw new Error(error.message);
//                 }
    
//                 await fetch("/api/sentfile", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         send_file_to: currentEmail,
//                         sender: currentSender
//                     }),
//                 });
    
//                 if (data) {
//                     return data;
//                 } else {
//                     throw new Error("Error sending file");
//                 }
//             };
    
//             try {
//                 await toast.promise(uploadPromise(), {
//                     loading: 'Sending...',
//                     success: 'Successfully sent',
//                     error: (err) => `Error: ${err.message}`
//                 });
    
//                 setFile(null);
//                 setCurrentEmail("");
//                 if (fileInputRef.current) {
//                     fileInputRef.current.value = "";
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     };
    
//     return (
//         <div className='shadow-xl shadow-gray-400 w-96 h-72 m-12 mx-48 flex flex-col items-center'>
//             <p className="font-bold text-blue-900 text-xl p-2 m-2 text-center">Upload the file to send</p>
//             {currentEmail && <p className='text-blue-900'>To {currentEmail}</p>}
//             <input
//                 ref={fileInputRef}
//                 className="shadow-lg rounded-md p-2 my-4 block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-500 file:text-white
//                     hover:file:bg-blue-800 cursor-pointer"
//                 type="file"
//                 onChange={handleFileSelect}
//                 accept=".pdf, .doc, .docx, .txt"
//             />
//             <Button onClick={sendFileFun} className='w-28' colorScheme='blue' variant='solid' size='sm'>
//                 Send
//             </Button>
//         </div>
//     );
// };

// export default Fileselect;

'use client';

import { Button } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';

interface FileselectProps {
  sender: { email: string } | null;
  email: string | null;
}

const Fileselect: React.FC<FileselectProps> = ({ sender, email }) => {
  const [currentSender, setCurrentSender] = useState<string | undefined>(sender?.email);
  const [currentEmail, setCurrentEmail] = useState<string | null>(email);
  const [prS, setPrs] = useState<any>('');
  const [prR, setPrR] = useState<any>('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("Sender private key is " + prS[0]?.private_key);
  }, [prS]);

  useEffect(() => {
    console.log("Receiver private key is " + prR[0]?.private_key);
  }, [prR]);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  const sendFileFun = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    if (prR === "") {
      toast.error("Select the sender to whom you want to send");
      return;
    } else {
      const uploadPromise = async () => {
        const { data, error } = await supabase
          .storage
          .from('bucket')
          .upload(prR[0]?.private_key + prS[0]?.private_key + '/' + file.name, file);

        if (error) {
          throw new Error(error.message);
        }

        await fetch("/api/sentfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            send_file_to: currentEmail,
            sender: currentSender
          }),
        });

        if (data) {
          return data;
        } else {
          throw new Error("Error sending file");
        }
      };

      try {
        await toast.promise(uploadPromise(), {
          loading: 'Sending...',
          success: 'Successfully sent',
          error: (err) => `Error: ${err.message}`
        });

        setFile(null);
        setCurrentEmail("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='shadow-xl shadow-gray-400 w-96 h-72 m-12 mx-48 flex flex-col items-center'>
      <p className="font-bold text-blue-900 text-xl p-2 m-2 text-center">Upload the file to send</p>
      {currentEmail && <p className='text-blue-900'>To {currentEmail}</p>}
      <input
        ref={fileInputRef}
        className="shadow-lg rounded-md p-2 my-4 block w-full text-sm text-gray-500
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


