import { Product } from "@/db/schema";
import { formatCurrency } from "@/lib/utils";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const ProductCard = (product: Product) => {
  const filledStars = Math.floor(product.rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="flex flex-col justify-between overflow-hidden text-left space-y-2">
        <Link href={`/products/${product.productId}`} className="">
            <div className="w-full h-48">
                <Image
                    src={product.images![0]}
                    width={100}
                    height={100}
                    objectFit="cover"
                    className="w-full h-full object-cover rounded-md"
                    alt=""
                />
            </div>
        </Link>
        <div className="">
            <Link href={`/products/${product.productId}`} className="flex flex-col justify-self-end">
                {/* <p className="text-muted-foreground capitalize">{product.category}</p> */}
                <h1 className="text-muted-foreground">{product.name}</h1>

                <div className="flex">
                    {Array(filledStars).fill([]).map((_, index) => (
                        <StarFilledIcon key={index} />
                    ))}
                    {Array(emptyStars).fill([]).map((_, index) => (
                        <StarIcon key={index + filledStars} />
                    ))}
                </div>
                <p className="">{formatCurrency(Number(product.price))}</p>
            </Link>
        </div>
    </div>
  )
}

export default ProductCard