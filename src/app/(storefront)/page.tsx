import Image from 'next/image';
import React from 'react';
import StorefrontBanner from './_components/storefront-banner';
import FeatureProducts from './_components/feature-products';
import FeatureStores from './_components/feature-stores';
import { getProducts } from '@/actions/product';
import { ProductsPageProps } from '@/lib/types';

const Home = async ({ searchParams }: ProductsPageProps) => {
  // const products = await getProducts(searchParams);
  return (
    <div className='flex flex-col items-center space-y-32'>
      <div className="h-[calc(100vh-12rem)] grid place-items-center">
        <StorefrontBanner />
      </div>

      <div className="w-full max-w-[1200px] space-y-16">
        <FeatureProducts />
        <FeatureStores />
      </div>
    </div>
  )
}

export default Home
