"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewProduct: (productName: string) => void;
}

export function ProductCard({ product, onViewProduct }: ProductCardProps) {
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
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <button className="text-left" onClick={() => onViewProduct(product.name)} aria-label={`View details for ${product.name}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.hint}
            />
          </div>
          <div className="p-4 pb-2">
              <CardTitle className="text-base font-headline leading-tight">{product.name}</CardTitle>
          </div>
        </CardHeader>
      </button>
      <CardContent className="flex-grow p-4 pt-0">
        <CardDescription className="text-sm font-bold text-primary">{formatPrice(product.price)}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button size="sm" className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
