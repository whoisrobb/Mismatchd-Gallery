"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import StoreForm from '@/components/forms/store-form';

type CreateStoreProps = {
    userId: string
}

const CreateStore = ({ userId }: CreateStoreProps) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='space-x-1'>
          <span>Create store</span>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new store</DialogTitle>
          <DialogDescription>
            <StoreForm userId={userId!} setIsOpen={setIsOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateStore
