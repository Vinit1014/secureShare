'use client'
import React,{useState,useEffect} from 'react'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation';
// import Present from './present';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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
  
  console.log({loading, user})

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
  
  return (  
    <>
    {/* <h3>This is your timeline: {session?.user?.name}</h3> */}
    <div>page to be rendered after authentication</div>
    <h1>hello</h1>
    <button type="submit" onClick={handleLogout} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log out</button>
    {/* <Present/> */}
    </>
  )
}

export default AppSecurePage
