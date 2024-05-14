// import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import UserButton from '../elements/user-button';
import { Button } from '../ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import CartSheet from '../cart/cart-sheet';
import { cn } from '@/lib/utils';

interface SiteHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}

const SiteHeader = ({ children, className }: SiteHeaderProps) => {
  return (
    <header className={cn('flex z-50 justify-between items-center border-b h-16 sticky top-0 left-0 right-0 bg-background', className)}>
      <Link href={'/'} className='font-bold text-xl'>Mismatchd</Link>
      { children }
      <div className="flex items-center gap-2">
        {children && <CartSheet />}

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
