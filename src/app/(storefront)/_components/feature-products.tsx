import React from 'react';
import FeatureContent from './feature-content';
import { getFeaturedProducts } from '@/actions/product';
import ProductCard from '@/components/elements/product-card';
import ProductsDisplay from './products-display';

const FeatureProducts = async () => {
    const products = await getFeaturedProducts()
  return (
    <FeatureContent
      title='Feature products'
      subtitle='Explore our feature products'
      href='/products'
      linkName='View products'
    >
      <ProductsDisplay products={products!} />
    </FeatureContent>
  )
}

export default FeatureProducts
