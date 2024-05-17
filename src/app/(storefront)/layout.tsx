import SiteHeader from '@/components/shells/site-header';
import React from 'react'
import StoreNavigation from './_components/store-navigation';
import Footer from '@/components/elements/footer';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
        <SiteHeader className='h-24' />
        <StoreNavigation />
        <div className="space-y-24">
          {children}
          <Footer />
        </div>
    </div>
  )
}

export default layout
