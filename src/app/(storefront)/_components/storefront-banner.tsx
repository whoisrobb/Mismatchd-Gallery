import React from 'react';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const StorefrontBanner = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center gap-4 max-w-6xl">
        <Link href={'https://github.com/whoisrobb/mismatchd-gallery'} target="_blank">
            <Button variant={'secondary'} className="flex items-center">
                <GitHubLogoIcon className="mr-2" />
                Star on GitHub
            </Button>
        </Link>
        <h1 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent lg:text-7xl text-5xl font-bold">
            No trends, just statement. Dress Loud. Express yourself loud.
        </h1>
        <p className="text-muted-foreground lg:text-xl">
            Mismatchd is an enterprise ecommerce app with an intergrated CMS dashboard built with React, Express and PostgreSQL.
        </p>
        <div className="flex gap-2">
            <Link href={'#'}>
                <Button>
                    Buy now
                </Button>
            </Link>
            <Link href={'/dashboard/store'}>
                <Button variant={'outline'}>
                    Sell now
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default StorefrontBanner
