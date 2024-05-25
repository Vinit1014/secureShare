import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = (props: { email: string | null | undefined; handleFun: any }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);

    // Simulate registration process
    try {
      // Perform registration process here

      // After successful registration, reset loading state
      setIsRegistering(false);
    } catch (error) {
      // Handle error, if any
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex border font-medium text-[24px] px-3 py-1 m-2 rounded-lg w-full items-center justify-between">
        <Link href="/">
          <div className="flex cursor-pointer">SecureShare</div>
        </Link>
        <div className="flex gap-x-2">
          {props.email ? (
            <div>Logged in as {props.email}</div>
          ) : (
            <>
              <Link href={'/app.secure/register'}>
                <button
                  type="button"
                  className="flex w-30 justify-center mx-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600 relative"
                  onClick={handleRegister}
                  disabled={isRegistering}
                >
                  {isRegistering && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                    </div>
                  )}
                  Register
                </button>
              </Link>
            </>
          )}
          {props.email && (
            <button
              type="button"
              className="flex w-30 justify-center mx-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600"
              onClick={props.handleFun}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
