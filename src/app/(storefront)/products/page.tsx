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
  

const Products = async ({
  searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }) => {

    const priceFrom = searchParams.priceFrom
    const priceTo = searchParams.priceTo
    const order = searchParams.order
    const orderBy = searchParams.orderBy
    const category = searchParams.category
    const subCategory = searchParams.subCategory

    const products = await getProducts()
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button>
              Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            <SearchFilters />
          </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {JSON.stringify(searchParams)}

      <ProductsDisplay products={products!} /> 
    </div>
  )
}

export default Products