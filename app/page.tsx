'use client'; // Ensure the component is treated as a client component

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      // After some delay, navigate to the secure app
      window.location.href = '/app.secure';
    }, 1000); // Adjust the delay time as needed
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="max-w-xl text-center">
          <h2 className="text-4xl font-bold mb-8">Welcome to SecureShare</h2>
          <p className="text-lg mb-4">Enjoy secure file sharing with your friends.</p>
          <p className="text-lg mb-4">Already registered? Head over to the <strong>Secure App</strong>.</p>
          <Link href="/app.secure">
            <div onClick={handleNavigation} className="text-blue-500 hover:underline cursor-pointer">
              Go to Secure App
            </div>
          </Link>
        </div>
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75">
            {/* Replace with your own loading spinner */}
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
        )}
      </main>
    </>
  );
}
