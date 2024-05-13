"use client";

import { getStoreProducts } from '@/actions/product';
import { getSingleStore } from '@/actions/store';
import ContentShell from '@/components/shells/content-shell';
import { Button } from '@/components/ui/button';
import { Product } from '@/db/schema';
import { Store } from '@/db/schema/store-table';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductTable from '../../_components/product-table';


const page = () => {
  const { storeId } = useParams();
  const [storeData, setStoreData] = useState<Store | null>(null);
  const [productsData, setProductsData] = useState<Product[] | null>(null);

  useEffect(() => {
    getStoreData()
  }, [])
  
  const getStoreData = async () => {
    try {
      const [store, products] = await Promise.all([getSingleStore(storeId as string), getStoreProducts(storeId as string)]);
      setStoreData(store!);
      setProductsData(products!)
    } catch (error) {
      toast.error('An unexpected error occurred.');
    }
  }
  return (
    <ContentShell
      title={storeData?.name!}
      subtitle={storeData?.description!}
    >
      <Link href={`/admin/stores/${storeId}/create-product`}>
        <Button className='space-x-1'>
          <span>Create product</span>
          <PlusIcon />
        </Button>
      </Link>
      {productsData && <ProductTable products={productsData!} />}

    </ContentShell>
  )
}

export default page
