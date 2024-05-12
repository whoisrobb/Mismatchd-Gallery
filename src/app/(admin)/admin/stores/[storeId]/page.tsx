"use client";

import { getSingleStore } from '@/actions/store';
import ContentShell from '@/components/shells/content-shell';
import { Button } from '@/components/ui/button';
import { Store } from '@/db/schema/store-table';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Stores = () => {
  const { storeId } = useParams();
  const [storeData, setStoreData] = useState<Store | null>(null);

  useEffect(() => {
    getStoreData()
  }, [])
  
  const getStoreData = async () => {
    try {
      const data = await getSingleStore(storeId as string);
      setStoreData(data!);
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
    </ContentShell>
  )
}

export default Stores
