"use client";

import { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { getFeaturedProducts } from "@/ai/flows/featured-products";
import { Product, products as allProducts } from "@/lib/products";
import { FeaturedProductCard } from "./FeaturedProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

interface FeaturedProductsProps {
  onViewProduct: (productName: string) => void;
}

export function FeaturedProducts({ onViewProduct }: FeaturedProductsProps) {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getFeaturedProducts();
        const featuredProducts = result.featuredProducts
          .map(name => allProducts.find(p => p.name.toLowerCase() === name.toLowerCase()))
          .filter((p): p is Product => p !== undefined);
          
        setFeatured(featuredProducts.slice(0, 8));
      } catch (e) {
        console.error("Failed to get featured products:", e);
        setError("Could not fetch featured products at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="w-full space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-headline font-bold">Featured Products</h2>
        </div>
        <p className="text-muted-foreground">Handpicked for you, check out our top products.</p>
        
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex h-full flex-col overflow-hidden rounded-lg border">
                    <Skeleton className="aspect-[4/3] w-full" />
                    <div className="flex-1 space-y-2 p-4">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-8 w-full pt-2" />
                    </div>
                  </div>
              ))}
          </div>
        )}
        
        {error && <p className="text-destructive">{error}</p>}
        
        {!loading && !error && featured.length > 0 && (
          <Carousel 
            opts={{ align: "start", loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {featured.map((product) => (
                <CarouselItem key={product.id} className="pl-4">
                  <div className="p-1 h-full">
                     <FeaturedProductCard product={product} onViewProduct={onViewProduct} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        {!loading && !error && featured.length === 0 && (
             <p className="text-muted-foreground pt-4">No featured products available right now. Please check back later.</p>
        )}
    </div>
  );
}
