import React, { ReactNode } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';

interface MobileNavProps {
    children: ReactNode
}

const MobileNav = ({ children }: MobileNavProps) => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>
            <Link href={'/'} className='font-bold text-xl'>Mismatchd</Link>
        </SheetTitle>
        <SheetDescription>
            { children }
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}

export default MobileNav
