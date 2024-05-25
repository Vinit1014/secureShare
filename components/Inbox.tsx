import React, { useEffect, useRef, useState } from 'react';
import { Download, Trash2 } from 'lucide-react';

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
    CircularProgress
} from '@chakra-ui/react';

interface InboxProps {
    loggedUser: string | null;
}

const Inbox: React.FC<InboxProps> = ({ loggedUser }) => {

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
    const [loadingInbox, setLoadingInbox] = useState(true);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

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
            } else {
                if (DataFetch && DataFetch.length > 0) {
                    setInbox(DataFetch[0].sent_files_to)
                }
            }

        } catch (error) {
            console.log("Error while performing the task " + error);
        } finally {
            setLoadingInbox(false);
        }
    }

    useEffect(() => {
        if (logUser) {
            fetchInbox()
        }
    }, [logUser])

    useEffect(() => {
        if (prS.length > 0 && prR.length > 0) {
            fetchFiles(prS[0].private_key, prR[0].private_key);
        }
    }, [prS, prR]);

    const fetchPrivateKeys = async (email:any) => {
        try {
            const { data: privateKeyData, error: privateKeyError } = await supabase
                .from('User')
                .select('private_key')
                .eq('email', logUser);

            if (privateKeyError) {
                console.error("Could not fetch sender's private key", privateKeyError);
            } else {
                setPrR(privateKeyData);
            }

            const { data: privateKeyData1, error: privateKeyError1 } = await supabase
                .from('User')
                .select('private_key')
                .eq('email', email);

            if (privateKeyError1) {
                console.error("Could not fetch receiver's private key", privateKeyError1);
            } else {
                setPrS(privateKeyData1);
            }
        } catch (error) {
            console.error('Error fetching private keys', error);
        }
    };

    const fetchFiles = async (senderPrivateKey: any, receiverPrivateKey: any) => {
        setLoadingFiles(true);
        try {
            const { data, error } = await supabase
                .storage
                .from('bucket')
                .list(receiverPrivateKey + senderPrivateKey);
                // .list(senderPrivateKey + receiverPrivateKey);
                
            if (error) {
                console.log("Error fetching files: ", error);
            } else {
                if (data && data.length > 0) {
                    setFileArray(data);
                } else {
                    setFileArray([]);
                }
            }
        } catch (error) {
            console.error('Error fetching files', error);
        } finally {
            setLoadingFiles(false);
        }
    };

    const handleClick = async (email: any) => {
        console.log("Clicked " + email);
        setSelectedEmail(email); // Set the selected email
        fetchPrivateKeys(email);
    }

    const handleDownload = (name: any) => {
        console.log("Clicked " + name);
        setFileNameToDownload(name);
        onOpen(); // Open the overlay when download icon is clicked
    }

    const privateKeyFun = async () => {
        console.log(privateKeyRef.current.value);
        if (privateKeyRef.current.value == prR[0].private_key) {
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

    const handleDelete = async(name: any)=>{
        console.log("Deleted "+name);
        const res = await supabase
        .storage
        .from('bucket')
        .remove([`${prR[0].private_key}` + `${prS[0].private_key}` + `/${name}`])

        if (res) {
            toast.success("Deleted successfully");
            fetchFiles(prS[0].private_key, prR[0].private_key);
            console.log("Deleted successfully");
        }
    }

    useEffect(() => {
        console.log("Private key entered is " + privateKeyRef.current.value);
    }, [privateKeyRef])

    return (
        <>
            <div className="border-gray-200 border-2">
                {loadingInbox ? <div className='m-6 flex justify-center'>
        <CircularProgress isIndeterminate color='blue.300' />
      </div> : 
                <>
                {inbox && inbox.length > 0 ? (
                    <ul className="p-1 w-84 m-4 shadow-md">
                        {inbox && inbox.map((name: any, index: number) => {
                            return (
                                <li
                                    onClick={() => handleClick(name)}
                                    key={index}
                                    className={`p-2 m-0 cursor-pointer ${selectedEmail === name ? 'bg-blue-100' : ''}`}
                                >
                                    {name}
                                    <hr></hr>
                                </li>
                            )
                        })}
                    </ul>
                    ): 
                    (
                    <div className="col-span-3 flex justify-center items-center h-full">
                      <p className="text-xl font-bold text-gray-500">Your inbox is empty</p>
                    </div>)
                }
                </>
                }
            </div>
            <div className="border-gray-200 border-2 w-full col-span-2">
                {loadingFiles ? (
                    <div className='m-6 flex justify-center'>
                    <CircularProgress isIndeterminate color='blue.300' />
                  </div>
                ) : (
                    <>
                        {selectedEmail ? (
                            fileArray && fileArray.length > 0 ? (
                                fileArray.map((name: any, index: number) => (
                                    <>
                                    <div key={index} className='p-4 flex justify-between'>
                                        {name.name}
                                        <>
                                        <div className=' flex'>
                                            <Trash2 className='mx-4 cursor-pointer' onClick={()=>{handleDelete(name.name);}}/>
                                            <Download className='cursor-pointer' onClick={() => { handleDownload(name.name); }}/>
                                        </div>
                                        </>

                                    </div>
                                    <hr></hr>
                                    </>
                                ))
                            ) : (
                                <p className='m-4'>No files found for the selected user.</p>
                            )
                        ) : (
                            <p className='m-4'>Click on a user to see the files sent by them.</p>
                        )}
                    </>
                )}
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
