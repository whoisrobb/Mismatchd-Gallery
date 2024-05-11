"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { storeSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { createStore } from "@/actions/store";
import { toast } from "sonner";

type InputSchema = z.infer<typeof storeSchema>;

type StoreFormProps = {
    userId: string,
    setIsOpen: (isOpen: boolean) => void
}

const StoreForm = ({ userId, setIsOpen }: StoreFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<InputSchema>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const onSubmit = async (values: InputSchema) => {
        const { name, description } = values;
        setIsSubmitting(true);

        try {
            const promise = new Promise(async (resolve, reject) => {
                const { data, error } = await createStore({ name, userId, description });
                if (error) {
                    reject(error);
                } else {
                    resolve(data?.name);
                }
            });

            const result = await toast.promise(promise, {
                loading: 'Creating Store...',
                success: (data) => `${data} store created successfully!`,
                error: (error) => `${error.message}`,
            });

        } catch (error) {
            toast.error('Failed!');
        } finally {
            setIsSubmitting(false);
            setIsOpen(false)
            form.reset();
        }
    };

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
        <Button disabled={isSubmitting}>Submit</Button>
      </form>
    </Form>
  )
}

export default StoreForm;