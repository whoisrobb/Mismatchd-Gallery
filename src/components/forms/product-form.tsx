"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { productSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Cross1Icon, ImageIcon } from "@radix-ui/react-icons";
import { FileResponse } from "@/lib/types";
import FileInput from "../elements/file-input";
import Image from "next/image";
import { createProduct, updateProduct } from "@/actions/product";
import { toast } from "sonner";
import { getCategories } from "@/actions/site";
import { Product } from "@/db/schema";

type InputSchema = z.infer<typeof productSchema>;

type ProductFormData = {
  storeId: string,
  product?: Product,
}
// interface ProductFormData extends InputSchema {
//   images: string[],
//   storeId: string
// }

type ProductFormProps = {
    storeId: string,
    productData?: Product
}

type Category = {
  categoryId: string,
  title: string,
  subcategories: {
      categoryId: string | null,
      title: string,
      description: string,
      subcategoryId: string,
  }[],
}

const ProductForm = ({ storeId, productData }: ProductFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileUrls, setFileUrls] = useState<FileResponse[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const form = useForm<InputSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: productData?.name || '',
            description: productData?.description || '',
            category: productData?.category || '',
            subcategory: productData?.subcategory || '',
            price: productData?.price || '0',
            inventory: productData?.inventory.toString() || '0',
            tags: productData?.tags?.toString() || '',
        }
    })
  
    useEffect(() => {
      fetchCategories();
    }, [])
  
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data!);
    }

    const onSubmit = async (values: InputSchema) => {
      const { name, description, price, inventory, tags, category, subcategory } = values;

      const productForm = {
        name,
        description,
        price,
        inventory: Number(inventory),
        tags: [tags],
        storeId,
        category,
        subcategory,
        images: fileUrls?.map((fileResponse) => fileResponse.serverData.fileUrl)
      }

      const updateForm = {...productForm, productId: productData!.productId}
      
      setIsSubmitting(true);
      
      if (productData) {
        const data = await updateProduct(updateForm)
      } else {
        const data = await createProduct(productForm)
      }

      toast.success("Successfully created product");

      setIsSubmitting(false);
      form.reset();
      setFileUrls([]);
    };

    const addFiles = (files: FileResponse[]) => {
        setFileUrls(files)
    }

    const triggerDialog = (value: boolean) => {
        setDialogOpen(value)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store name</FormLabel>
              <FormControl>
                <Input placeholder="Add store name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="inventory"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Inventory</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Inventory" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="featured">featured</SelectItem>
                            <SelectItem value="non-featured">non-featured</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set category</FormLabel>
                <FormControl>

                  <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                          <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                          {categories.map((cat) => (
                              <SelectItem value={cat.title} key={cat.categoryId}>{cat.title}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set sub-category</FormLabel>
                <FormControl>

                  <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                          <SelectValue placeholder="Set sub-category" />
                      </SelectTrigger>
                      <SelectContent>
                          
                      {categories.map((category) => (
                          <div key={category.categoryId}>
                          {category.subcategories.map((subcategory) => (
                              <SelectItem value={subcategory.title} key={subcategory.subcategoryId} className="subcategory">{subcategory.title}</SelectItem>
                          ))}
                          </div>
                      ))}
                      </SelectContent>
                  </Select>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex items-center justify-between">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button type="button" className="space-x-1" variant={"outline"}>
                      <span>Add images</span>
                        <ImageIcon />
                    </Button>
                </DialogTrigger>
                <FileInput addFiles={addFiles} triggerDialog={triggerDialog} />
            </Dialog>
        </div>

        <ProductImages fileUrls={fileUrls!} />

        <Button disabled={isSubmitting}>Submit</Button>
      </form>
    </Form>
  )
}

export default ProductForm;


const ProductImages = ({ fileUrls }: { fileUrls: FileResponse[] }) => {

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Images</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fileUrls.map((file, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <Image src={file.serverData.fileUrl} height={50} width={50} alt="" />
            </TableCell>
            <TableCell>{file.name}</TableCell>
            <TableCell>
              <Button variant={"ghost"} size={"icon"}>
                <Cross1Icon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  )
}