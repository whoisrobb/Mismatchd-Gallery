import ContentShell from '@/components/shells/content-shell';
import { Product, Store } from '@/db/schema';
import React from 'react';
import ProductsDisplay from '../../_components/products-display';

type StoreProductsProps = {
    name: string;
    storeId: string;
    userId: string;
    description: string | null;
    slug: string | null;
    active: boolean;
    stripeAccountId: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    products: Product[]
}

const StoreProducts = (storeData: StoreProductsProps) => {
  return (
    <ContentShell
        title={storeData.name}
        subtitle={storeData.description!}
    >
     <ProductsDisplay products={storeData.products} /> 
    </ContentShell>
  )
}

export default StoreProducts
