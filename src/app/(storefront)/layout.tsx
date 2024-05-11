import SiteHeader from '@/components/elements/site-header';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
        <SiteHeader>
            placeholder
        </SiteHeader>
        {children}
    </div>
  )
}

export default layout
