"use client";

import { deleteProduct } from '@/actions/product';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React from 'react'
import { toast } from 'sonner';

const ProductDelete = ({ productId }: { productId: string }) => {
    const onDelete = async () => {
        const res = await deleteProduct(productId)
        toast.success(res)
    }
  return (
    <DropdownMenuItem
        onClick={(onDelete)}
    >
        Delete
    </DropdownMenuItem>
  )
}

export default ProductDelete
