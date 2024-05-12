"use client";

import ProductForm from '@/components/forms/product-form';
import ContentShell from '@/components/shells/content-shell';
import { usePathname } from 'next/navigation';
import React from 'react';

const CreateProduct = () => {
  const pathname = usePathname();
  const storeId = pathname.split('/').slice(-2)[0];
  return (
    <ContentShell
      title='Create a new product'
      subtitle='Create a new product to add to your store'>
      <ProductForm storeId={storeId!} />
    </ContentShell>
  )
}

export default CreateProduct
