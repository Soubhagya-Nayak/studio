"use client";

import { useEffect, useState } from "react";
import { getProductRecommendations } from "@/ai/flows/product-recommendations";
import { Product, products as allProducts } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit } from "lucide-react";

interface ProductRecommendationsProps {
  viewedProducts: string[];
  onViewProduct: (productName: string) => void;
}

export function ProductRecommendations({ viewedProducts, onViewProduct }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (viewedProducts.length === 0) {
      setRecommendations([]);
      return;
    }

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getProductRecommendations({ viewedProducts });
        const recommendedProducts = result.recommendedProducts
          .map(name => allProducts.find(p => p.name.toLowerCase() === name.toLowerCase()))
          .filter((p): p is Product => p !== undefined)
          .filter(p => !viewedProducts.includes(p.name)); 
          
        setRecommendations(recommendedProducts.slice(0, 8));
      } catch (e) {
        console.error("Failed to get recommendations:", e);
        setError("Could not fetch recommendations at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [viewedProducts]);

  if (viewedProducts.length === 0 && !loading) {
    return null;
  }
  
  return (
    <div className="w-full space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-headline font-bold">Recommended For You</h2>
        </div>
        <p className="text-muted-foreground">Based on items you've viewed, you might also like these.</p>
        
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex h-full flex-col overflow-hidden rounded-lg border">
                    <Skeleton className="aspect-[4/3] w-full" />
                    <div className="flex-1 space-y-2 p-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-8 w-full pt-4" />
                    </div>
                  </div>
              ))}
          </div>
        )}
        
        {error && <p className="text-destructive">{error}</p>}
        
        {!loading && !error && recommendations.length > 0 && (
          <Carousel opts={{ align: "start", loop: recommendations.length > 3 }}>
            <CarouselContent className="-ml-4">
              {recommendations.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                  <div className="p-1 h-full">
                     <ProductCard product={product} onViewProduct={onViewProduct} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        {!loading && !error && recommendations.length === 0 && viewedProducts.length > 0 && (
             <p className="text-muted-foreground pt-4">No new recommendations for now. Keep browsing!</p>
        )}
    </div>
  );
}
