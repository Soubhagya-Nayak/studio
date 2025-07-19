"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ShoppingCartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShoppingCartSheet({ open, onOpenChange }: ShoppingCartSheetProps) {
  const { cart, updateQuantity, removeFromCart, totalPrice, itemCount } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-4 -mr-6">
              <div className="flex flex-col gap-6 py-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={item.product.hint}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center" aria-live="polite">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator className="mt-auto" />
            <SheetFooter className="mt-4">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex justify-between font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                     <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <SheetClose asChild>
                      <Button size="lg" className="w-full">Proceed to Checkout</Button>
                    </SheetClose>
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingCartIcon className="h-16 w-16 text-muted-foreground/50" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-center text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <SheetClose asChild>
                <Button>Start Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
