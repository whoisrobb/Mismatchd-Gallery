"use client";

import ContentShell from '@/components/shells/content-shell';
import { Product, Store } from '@/db/schema';
import React, { useEffect, useState } from 'react';
import ProductsDisplay from '../../_components/products-display';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { getSingleStoreProducts } from '@/actions/store';

interface StoreProductsProps extends Store {
    products: Product[]
}

const StoreProducts = () => {
    const [storeData, setStoreData] = useState<StoreProductsProps | null>(null);
    const { storeId } = useParams();

    useEffect(() => {
        fetchStoreData();
    }, []);

    const fetchStoreData = async () => {
        try {
            const data = await getSingleStoreProducts(storeId as string);
            setStoreData(data!)
        } catch (err) {
            toast.error("Failed to fetch store data")
        }
    }

  return (
    storeData &&
    <ContentShell
        title={storeData.name}
        subtitle={storeData.description!}
    >
     <ProductsDisplay products={storeData.products} /> 
    </ContentShell>
  )
}

export default StoreProducts
