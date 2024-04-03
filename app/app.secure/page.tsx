import React from 'react'
import { authOptions, loginIsRequiredServer } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import Present from './present';

const page = async() => {
    const session = await getServerSession(authOptions);
    await loginIsRequiredServer();
    console.log("Session: ",session);
             
  return (  
    <>
    <h3>This is your timeline: {session?.user?.name}</h3>
    <div>page to be rendered after authentication</div>
    <Present/>
    </>
  )
}

export default page
