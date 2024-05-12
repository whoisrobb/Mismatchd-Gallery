// import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import UserButton from '../elements/user-button';
import { Button } from '../ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';

interface SiteHeaderProps {
    children: ReactNode
}

const SiteHeader = ({ children }: SiteHeaderProps) => {
  return (
    <header className='flex justify-between items-center border-b h-16'>
        <Link href={'/'} className='font-bold text-xl'>Mismatchd</Link>
        { children }
        <div className="flex items-center gap-2">                
            <div className="hidden lg:block md:block">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            <SignedOut>
              <Link href={'/sign-in'}>
                <Button>Sign in</Button>
              </Link>
            </SignedOut>
        </div>
    </header>
  )
}

export default SiteHeader
