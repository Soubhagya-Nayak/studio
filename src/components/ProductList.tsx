"use client";

import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/products';

interface ProductListProps {
  products: Product[];
  onViewProduct: (productName: string) => void;
}

export function ProductList({ products, onViewProduct }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 py-12 text-center">
        <h3 className="text-xl font-semibold">No products found</h3>
        <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onViewProduct={onViewProduct} />
      ))}
    </div>
  );
}
