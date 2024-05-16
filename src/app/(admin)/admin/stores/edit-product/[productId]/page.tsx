"use client";

import { getSingleProduct } from '@/actions/product';
import ProductForm from '@/components/forms/product-form';
import ContentShell from '@/components/shells/content-shell';
import { Product } from '@/db/schema';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditProduct = () => {
  const pathname = usePathname();
  const productId = pathname.split('/').slice(-1)[0];
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduct()
  }, []);

  const fetchProduct = async () => {
    const data = await getSingleProduct(productId as string);
    setProductData(data!)
  }

  return (
    <ContentShell
      title='Edit product'
      subtitle='Add or edit details to your product'>
      {productData && <ProductForm storeId={productData.storeId} productData={productData} />}
      {/* {productId} */}
    </ContentShell>
  )
}

export default EditProduct
