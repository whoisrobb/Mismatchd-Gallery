import React from 'react'
import ProductsDisplay from '../_components/products-display'
import { getProducts } from '@/actions/product'

const Products = async () => {
    const products = await getProducts()
  return (
    <div>
    <ProductsDisplay products={products!} /> 
    </div>
  )
}

export default Products
