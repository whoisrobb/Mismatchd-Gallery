import ProductCard from '@/components/elements/product-card';
import { Product } from '@/db/schema';
import React from 'react';

const ProductsDisplay = ({ products }: { products: Product[] }) => {
  return (
    <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-x-2 gap-y-4'>
      {products?.map((product) => (
        <ProductCard key={product.productId} {...product} />
      ))}
    </div>
  )
}

export default ProductsDisplay
