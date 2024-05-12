"use client";

import ContentShell from '@/components/shells/content-shell';
import { usePathname } from 'next/navigation';
import React from 'react';

const page = () => {
  const pathname = usePathname();
  const id = pathname.split('/').slice(-2)[0];
  return (
    <ContentShell
      title='Create a new product'
      subtitle='Create a new product to add to your store'>
      {id}
    </ContentShell>
  )
}

export default page
