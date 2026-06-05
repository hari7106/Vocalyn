'use client'
import React from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

function Header() {
  const router = useRouter()
  return (
     <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
       <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        <h1 className="text-base font-bold md:text-2xl">VocaLyn</h1>
      </div>

      <div className="hidden md:flex items-center gap-8 text-base font-semibold text-neutral-600 dark:text-neutral-300">
        <button
          type="button"
          aria-label="Go to home"
          onClick={() => router.push('/')}
          className="hover:text-black dark:hover:text-white transition"
        >
          Home
        </button>

        <button
          type="button"
          aria-label="How it works"
          onClick={() => router.push('/how')}
          className="hover:text-black dark:hover:text-white transition"
        >
          How it works?
        </button>

        <button
          type="button"
          aria-label="Topics"
          onClick={() => router.push('/topics')}
          className="hover:text-black dark:hover:text-white transition"
        >
          Topics
        </button>
      </div>
    <Button onClick={() => router.push('/auth')}>GET STARTED</Button>
    </nav>
  )
}

export default Header