export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  hint: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Leather Watch',
    price: 150,
    image: 'https://placehold.co/600x400.png',
    description: 'A timeless piece that combines elegance and durability. Perfect for any occasion.',
    category: 'Accessories',
    hint: 'watch accessory'
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Headphones',
    price: 99,
    image: 'https://placehold.co/600x400.png',
    description: 'Immerse yourself in high-fidelity sound with these noise-cancelling headphones.',
    category: 'Electronics',
    hint: 'headphones music'
  },
  {
    id: '3',
    name: 'Modern Drip Coffee Maker',
    price: 75,
    image: 'https://placehold.co/600x400.png',
    description: 'Brew the perfect cup of coffee every morning with this sleek and easy-to-use machine.',
    category: 'Home Goods',
    hint: 'coffee kitchen'
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 250,
    image: 'https://placehold.co/600x400.png',
    description: 'Stay comfortable and productive with this chair designed for long hours of work.',
    category: 'Furniture',
    hint: 'chair office'
  },
  {
    id: '5',
    name: 'Organic Cotton T-Shirt',
    price: 25,
    image: 'https://placehold.co/600x400.png',
    description: 'A soft, breathable, and sustainably-made t-shirt for everyday wear.',
    category: 'Apparel',
    hint: 'shirt clothing'
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    price: 30,
    image: 'https://placehold.co/600x400.png',
    description: 'Keep your drinks cold for 24 hours or hot for 12 with this insulated bottle.',
    category: 'Accessories',
    hint: 'bottle water'
  },
  {
    id: '7',
    name: 'Portable Power Bank',
    price: 45,
    image: 'https://placehold.co/600x400.png',
    description: 'Charge your devices on the go with this compact and powerful power bank.',
    category: 'Electronics',
    hint: 'charger phone'
  },
  {
    id: '8',
    name: 'Travel Yoga Mat',
    price: 40,
    image: 'https://placehold.co/600x400.png',
    description: 'A non-slip, cushioned, and foldable mat for your yoga practice and fitness routines on the go.',
    category: 'Sports',
    hint: 'yoga fitness'
  },
];
