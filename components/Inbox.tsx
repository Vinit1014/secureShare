"use-client"
import React from 'react'
import { Download } from 'lucide-react';

const Inbox = () => {
    
    return (
        <>
            <div className="border-purple-400 border-2">
                <ul className="p-1 w-84 m-4 shadow-md border-2 border-red-950">
                    <li className="p-2 m-0 cursor-pointer border-2 border-blue-400">
                        Sender1
                        <hr></hr>
                    </li>
                    <li className="p-2  m-0 cursor-pointer border-2 border-blue-400">
                        Sender2
                        <hr></hr>
                    </li>       
                    <li className="p-2  m-0 cursor-pointer">
                        Sender3
                        <hr></hr>
                    </li>
                    <li className="p-2  m-0 cursor-pointer">
                        Sender4
                        <hr></hr>
                    </li>       
                </ul>
            </div>
            <div className="border-blue-400 border-2 w-full col-span-2">
                <div className='border-2 p-4 border-red-400 flex justify-between'>
                    <div>
                        File name 1
                    </div>
                    <div>
                        <Download/>
                    </div>
                </div>

                <div className='border-2 p-4 border-red-400'>File name 2</div> 
            </div>   
    </>
  )
}

export default Inbox
