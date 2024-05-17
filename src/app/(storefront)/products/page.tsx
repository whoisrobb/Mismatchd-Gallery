import React from 'react'
import ProductsDisplay from '../_components/products-display'
import { getProducts } from '@/actions/product'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import SearchFilters from '../_components/search-filters'
import { ProductsPageProps } from '@/lib/types'


const Products = async ({
  searchParams }: ProductsPageProps) => {
    const products = await getProducts(searchParams);
  return (
    <div className='space-y-6'>
      <Sheet>
        <SheetTrigger>
          <Button>
              Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            <SearchFilters />
          </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <ProductsDisplay products={products!} />
    </div>
  )
}

export default Products