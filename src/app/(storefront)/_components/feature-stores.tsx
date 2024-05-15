import React from 'react';
import FeatureContent from './feature-content';
import StoreCard from '@/components/elements/store-card';
import { getFeaturedStores } from '@/actions/store';
import Link from 'next/link';

const FeatureStores = async () => {
    const stores = await getFeaturedStores()
  return (
    <FeatureContent
      title='Feature stores'
      subtitle='Explore shops we think you might love'
      href='/products'
      linkName='View products'
    >
      <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2">
        {stores?.map((store) => (
            <Link href={`/store/${store.storeId}`} key={store.storeId}>
                <StoreCard
                    name={store.name}
                    description={store.description!}
                    className='h-48'
                />
            </Link>
        ))}
      </div>
    </FeatureContent>
  )
}

export default FeatureStores
