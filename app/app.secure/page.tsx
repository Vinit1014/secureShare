'use client'
import React,{useState,useEffect} from 'react'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation';
import Present from './present';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Navbar from '@/components/Navbar';

const AppSecurePage = () => {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
      async function getUser(){
          const {data: {user}} = await supabase.auth.getUser()
          setUser(user)
          setLoading(false)
      }
          
      getUser();
    }, [])
  
  // console.log({loading, user})

  if (loading){
    return <h1>loading..</h1>
  }

  if (user==null) {
    router.push("/app.secure/login")
    // redirect("/app.secure/login")
  }

  const handleLogout = async () => {
    // await supabase.auth.signOut();
    setUser(null)
    let { error } = await supabase.auth.signOut()
    router.refresh();
  }
  
  // const fetchUsers = async()=>{
  //   await fetch("/api/authe"),{
  //     method:"GET",
  //   };
  // }
  
  return (  
    <>
      
      <Navbar email={user?.email} handleFun={handleLogout}/>
      <div>page to be rendered after authentication</div>
      <h1>hello</h1>
      <Present/>
    </>
  )
}

export default AppSecurePage
