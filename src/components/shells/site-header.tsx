import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface SiteHeaderProps {
    children: ReactNode
}

const SiteHeader = ({ children }: SiteHeaderProps) => {
  return (
    <header className='flex justify-between items-center border-b h-16'>
        <Link href={'/'} className='font-bold text-xl'>Mismatchd</Link>
        { children }
        <UserButton />
    </header>
  )
}

export default SiteHeader
