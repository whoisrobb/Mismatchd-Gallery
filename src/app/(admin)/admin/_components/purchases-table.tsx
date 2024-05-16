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

type PurchaseItem = {
    orderId: string,
    address: string | null,
    isPaid: boolean | null,
    products: string,
    totalPrice: any,
    createdAt: Date,
}

const PurchasesTable = ({ purchases }: { purchases: PurchaseItem[] }) => {
  return (
    <Table>
      <TableCaption>A list of purchases made on the site.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Products</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Total price</TableHead>
          <TableHead className="">Paid</TableHead>
          <TableHead>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase, index) => (
        <TableRow key={index}>
          <TableCell className="">{purchase.products}</TableCell>
          <TableCell className='capitalize'>{purchase.address}</TableCell>
          <TableCell>{purchase.totalPrice}</TableCell>
          <TableCell className="">{purchase.isPaid == true ? 'true' : 'false'}</TableCell>

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
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>

        </TableRow>))}
      </TableBody>
    </Table>
  )
}

export default PurchasesTable
