import SiteHeader from '@/components/shells/site-header';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
      <SiteHeader>placeholder</SiteHeader>
      { children }
    </div>
  )
}

export default layout
