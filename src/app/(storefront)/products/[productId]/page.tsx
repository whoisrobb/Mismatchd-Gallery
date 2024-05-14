"use client";

import { getSingleProduct } from "@/actions/product";
import { useCart } from "@/components/cart/cart-provider";
import ContentShell from "@/components/shells/content-shell";
import { Button } from "@/components/ui/button";
import { type Product } from "@/db/schema";
import { MinusIcon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface CartProduct extends Product {
    quantity: number
}

const Product = () => {
    const { getItemQuantity, addToCart, increaseQuantity, decreaseQuantity } = useCart();
    const { productId } = useParams();
    const [productData, setProductData] = useState<Product | null>(null);

    useEffect(() => {
        getCategories();
    }, []);
    
    const getCategories = async () => {
        const data = await getSingleProduct(productId as string);
        setProductData(data!);
    }

    const quantity = getItemQuantity(productData?.productId as string);

    const ratingElements = Array.from({ length: productData?.rating as number }, (_, index) => (
        <StarFilledIcon key={index} />
    ));
  return (
    productData &&
    <ContentShell
        title={productData.name}
        // subtitle={productData.category}
    >
        <div className="lg:flex md:flex gap-12">
            <div className="max-w-2xl w-full lg:m-0 mb-8">
                <Image
                    src={productData.images![0]}
                    width={500}
                    height={500}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full h-full flex flex-col gap-6">
                <div className="">
                    <h1 className="text-5xl font-bold">{productData.name}</h1>
                    {/* <p className="text-muted-foreground text-lg">{productData.subCategory}</p> */}
                </div>
                <div className="">
                    <p className="text-lg text-muted-foreground">{productData.description}</p>
                </div>
                <div className="">
                    <h1 className="text-xl font-bold">{`KSH ${productData.price}`}</h1>
                    <div className="text-yellow-400 flex items-center gap-1">
                        {ratingElements}
                    </div>
                    <div className="text-muted-foreground">
                        {productData.inventory > 0
                        ? <p>(in stock)</p>
                        : <p>(out of stock)</p>}
                    </div>
                </div>
                <div className="">
                    {quantity > 0 ?
                    <div className="flex items-center gap-2">
                        <Button variant={'outline'} size={'icon'} className="" onClick={() => decreaseQuantity(productData.productId)}><MinusIcon /></Button>
                            <div className="">{quantity}</div>
                        <Button variant={'outline'} size={'icon'} className="" onClick={() => increaseQuantity(productData.productId)}><PlusIcon /></Button>
                    </div>
                    : <Button size={'sm'} onClick={() => addToCart(productData as CartProduct)} className="w-full">Add to cart</Button>}
                </div>
            </div>
        </div>
    </ContentShell>
  )
}

export default Product