import React from 'react'
import LoginForm from './form'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const page = async() => {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/app.secure")
  return (
    <div><LoginForm/></div>
  )
}

export default page