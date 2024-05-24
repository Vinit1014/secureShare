import React, { useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { Toaster, toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react';

const Inbox = ({ loggedUser }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>();
    const privateKeyRef = useRef<any>('');

    const [logUser, setLogUser] = useState(loggedUser)
    const [inbox, setInbox] = useState<any>();
    const [prS, setPrS] = useState<any>('')
    const [prR, setPrR] = useState<any>('')
    const [fileArray, setFileArray] = useState<any>([]);
    const [link, setLink] = useState<any>('');
    const [fileNameToDownload, setFileNameToDownload] = useState<any>('');

    useEffect(() => {
        console.log(fileArray);
    }, [fileArray])

    useEffect(() => {
        console.log("The link is " + link);
    }, [link])

    useEffect(() => {
        console.log("Sender private key is " + prS[0]?.private_key);
    }, [prS])

    useEffect(() => {
        console.log("Reciever private key is " + prR[0]?.private_key);
    }, [prR])

    useEffect(() => {
        console.log(inbox);
    }, [inbox])

    useEffect(() => {
        setLogUser(loggedUser)
    }, [loggedUser])

    useEffect(() => {
        console.log("Hello here I am " + logUser);
    }, [logUser])

    const fetchInbox = async () => {
        try {
            let { data: DataFetch, error: ErrorFound } = await supabase
                .from('User')
                .select('sent_files_to')
                .eq('email', logUser)

            if (ErrorFound) {
                console.log("Error while fetching inbox " + ErrorFound);
            }
            else {
                if (DataFetch && DataFetch.length > 0) {
                    setInbox(DataFetch[0].sent_files_to)
                }
            }

        } catch (error) {
            console.log("Error while performing the task " + error);
        }
    }

    useEffect(() => {
        if (logUser) {
            fetchInbox()
        }
    }, [])

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

    const fetchFiles = async (senderPrivateKey: any, receiverPrivateKey: any) => {
        try {
            const { data, error } = await supabase
                .storage
                .from('bucket')
                .list(receiverPrivateKey + senderPrivateKey);

            if (error) {
                console.log("Error fetching files: ", error);
            } else {
                if (data && data.length > 0) {
                    setFileArray(data);
                }
            }
        } catch (error) {
            console.error('Error fetching files', error);
        }
    };

    const handleClick = async (email: any) => {
        console.log("Clicked " + email);
        fetchPrivateKeys(email);
    }

    const handleDownload = (name: any) => {
        console.log("Clicked " + name);
        setFileNameToDownload(name);
        onOpen(); // Open the overlay when download icon is clicked
    }

    const privateKeyFun = async () => {
        console.log(privateKeyRef.current.value);
        if (privateKeyRef.current.value == prS[0].private_key) {
            //over here I want to implement handleDownload function
            toast.success("Private key matched")

            const { data } = supabase
                .storage
                .from('bucket')
                .getPublicUrl(`${prR[0].private_key}` + `${prS[0].private_key}` + `/${fileNameToDownload}`, {
                    download: true
                })

            if (data) {
                setLink(data.publicUrl)
                toast.success("Downloaded successfully")
                console.log('Download link set');

                // Programmatically create and click the download link
                const a = document.createElement('a');
                a.href = data.publicUrl;
                a.download = fileNameToDownload;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
        else {
            toast.error("Private key is incorrect")
        }
        privateKeyRef.current.value = "";
        onClose(); // Close the overlay after processing
    }

    useEffect(() => {
        console.log("PRivate key entered is " + privateKeyRef.current.value);
    }, [privateKeyRef])

    return (
        <>
            {/* <Toaster richColors /> */}
            <div className="border-purple-400 border-2">
                <ul className="p-1 w-84 m-4 shadow-md border-2 border-red-950">
                    {inbox && inbox.map((name: any, index: number) => {
                        return (
                            <li onClick={() => handleClick(name)} key={index} className="p-2 m-0 cursor-pointer border-2 border-blue-400">
                                {name}
                                <hr></hr>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="border-blue-400 border-2 w-full col-span-2">
                {fileArray && fileArray.map((name: any, index: number) => {
                    return (
                        <>
                            <div key={index} className='border-2 p-4 border-red-400 flex justify-between'>
                                {name.name}
                                <div onClick={() => { handleDownload(name.name); }}>
                                    <Download />
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader >
                        <div className='font-semibold text-2xl'>
                            To download the file
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <div>
                            <input ref={privateKeyRef} className='border-2 text-lg border-gray-300 rounded-md p-2 w-96' placeholder='Enter your private key'>
                            </input>
                        </div>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={privateKeyFun} colorScheme='green' ml={3}>
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
        </>
    )
}

export default Inbox
