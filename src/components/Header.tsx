"use client";

import { useState } from 'react';
import { ShoppingCart, Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCartSheet } from '@/components/ShoppingCart';
import { useCart } from '@/hooks/use-cart';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Store className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Shoping Duniya
            </h1>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge variant="default" className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full bg-primary p-0 text-xs text-primary-foreground">
                {itemCount}
              </Badge>
            )}
            <span className="sr-only">Open cart</span>
          </Button>
        </div>
      </header>
      <ShoppingCartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
