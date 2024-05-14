import React from 'react';
import FeatureContent from './feature-content';
import { getFeaturedProducts } from '@/actions/product';
import ProductCard from '@/components/elements/product-card';

const FeatureProducts = async () => {
    const products = await getFeaturedProducts()
  return (
    <FeatureContent
      title='Feature products'
      subtitle='Explore our feature products'
      href='/products'
      linkName='View products'
    >
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2">
        {products?.map((product) => (
            <ProductCard key={product.productId} {...product} />
        ))}
      </div>
    </FeatureContent>
  )
}

export default FeatureProducts
