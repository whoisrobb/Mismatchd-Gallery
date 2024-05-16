import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from '@/db/schema';
import { formatCurrency } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import ProductDelete from './product-delete';
import Link from 'next/link';


const ProductTable = ({ products }: { products: Product[] }) => {
  return (
    <Table>
      <TableCaption>A list of products available for this store.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead className="">Rating</TableHead>
          <TableHead>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
        <TableRow key={product.productId}>
          <TableCell className="">{product.name}</TableCell>
          <TableCell>{formatCurrency(Number(product.price))}</TableCell>
          <TableCell>{product.inventory}</TableCell>
          <TableCell className='capitalize'>{product.tags![0]}</TableCell>
          <TableCell className="">{product.rating}</TableCell>

        <TableCell>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
                >
                <DotsHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <Link href={`/admin/stores/edit-product/${product.productId}`}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <ProductDelete productId={product.productId} />
            </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>

        </TableRow>))}
      </TableBody>
    </Table>
  )
}

export default ProductTable
