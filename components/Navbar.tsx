'use-client'
import React from 'react'

const Navbar = (props: { email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, handleFun:any }) => {

  return (
    <div className="flex justify-center">
        <div className="flex border font-medium text-[24px] px-3 py-1 m-2 rounded-lg w-full items-center justify-between">
            <div className="flex">
              SecureShare
            </div>
            <div className="flex gap-x-2">
              <div>
                  Logged in as {props.email}
              </div>
              <button
                type="submit"
                className="flex w-30 justify-center mx-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600"
                onClick={props.handleFun}
              >
                Logout
              </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
