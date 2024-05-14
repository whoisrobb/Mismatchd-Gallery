import ContentShell from '@/components/shells/content-shell';
import { Product, Store } from '@/db/schema';
import React from 'react';
import ProductsDisplay from '../../_components/products-display';

interface StoreProductsProps extends Store {
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
