import MobileNav from '@/components/elements/mobile-nav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import React from 'react';

const MobileSideNav = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className='justify-self-end'>
            <Button variant={'outline'} size={'icon'} asChild>
                <HamburgerMenuIcon />
            </Button>
        </SheetTrigger>
      </Sheet>
    </div>
  )
}

export default MobileSideNav
