'use-client'
import React, { useEffect, useState } from 'react'

const Search = (props:any) => {
    const [email,setEmail] = useState<any>(props.email);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
    };
    
    const filteredEmails = email?.filter((email: { email: string; }) =>
        email.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    useEffect(()=>{
        setEmail(props.email)
        console.log("Your emails are "+email);
    },[email])
    
    return (
        <div>
            {/* <input placeholder="Search for sender's email" className=" border-gray-200 border-2 m-2 ml-4 focus:outline-none shadow-md focus:border-gray-300 focus:border-2 rounded-md" onChange={handleSearchChange}/> */}

            <input
                placeholder="Search for sender's email"
                className="w-80 h-12 border-gray-200 border-2 m-2 ml-4 focus:outline-none shadow-md focus:border-gray-300 focus:border-2 rounded-md"
                onChange={handleSearchChange}
            />


            {searchTerm && 

            <div className='border-2 border-red-500'> 
                <ul className="p-1 w-72 m-2 ml-4 shadow-md"> 
                        {filteredEmails.map((email: { id: React.Key | null | undefined;  email: string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                            <li className="p-1  m-0 cursor-pointer" key={email.id} onClick={()=>{console.log(email.email);
                        }}>                            
                            {email.email}
                            <hr></hr>
                        </li>
                        ))}  
                </ul>
            </div>}
        </div>
    )
}

export default Search
