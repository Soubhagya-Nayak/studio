"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface FeaturedProductCardProps {
  product: Product;
  onViewProduct: (productName: string) => void;
}

export function FeaturedProductCard({ product, onViewProduct }: FeaturedProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="flex w-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="flex">
        <div className="relative w-1/3 aspect-square">
            <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.hint}
            />
        </div>
        <div className="flex w-2/3 flex-col p-4">
            <button className="text-left" onClick={() => onViewProduct(product.name)} aria-label={`View details for ${product.name}`}>
                <CardHeader className="p-0">
                    <CardTitle className="text-base font-headline leading-tight">{product.name}</CardTitle>
                </CardHeader>
            </button>
            <CardContent className="flex-grow p-0 pt-2">
                <CardDescription className="text-sm font-bold text-primary">{formatPrice(product.price)}</CardDescription>
            </CardContent>
            <CardFooter className="p-0 pt-4">
                <Button size="sm" className="w-full" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </div>
      </div>
    </Card>
  );
}
