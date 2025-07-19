"use client";

import { useState, useMemo } from 'react';
import { products } from '@/lib/products';
import { Header } from '@/components/Header';
import { ProductList } from '@/components/ProductList';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewedProducts, setViewedProducts] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleViewProduct = (productName: string) => {
    setViewedProducts((prev) => {
      if (prev.includes(productName)) {
        return prev;
      }
      const newViewed = [productName, ...prev];
      toast({
          title: "Analyzing your interests...",
          description: `Adding "${productName}" to find recommendations.`,
      })
      return newViewed.slice(0, 5);
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-1">
        <div className="container mx-auto space-y-12 px-4 py-8 md:px-6">
          <section>
            <h2 className="mb-6 text-3xl font-bold font-headline md:text-4xl">Our Products</h2>
            <ProductList products={filteredProducts} onViewProduct={handleViewProduct} />
          </section>

          <section>
            <ProductRecommendations viewedProducts={viewedProducts} onViewProduct={handleViewProduct} />
          </section>
        </div>
      </main>
      <footer className="border-t bg-background/80">
          <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Shoping Duniya. All Rights Reserved.
          </div>
      </footer>
    </div>
  );
}
