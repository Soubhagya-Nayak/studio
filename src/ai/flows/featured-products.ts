'use server';
/**
 * @fileOverview A featured products AI agent.
 *
 * - getFeaturedProducts - A function that handles the featured products process.
 * - FeaturedProductsOutput - The return type for the getFeaturedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { products } from '@/lib/products';

const productNames = products.map(p => p.name);

const FeaturedProductsOutputSchema = z.object({
  featuredProducts: z
    .array(z.string())
    .describe('The list of product names that are featured.'),
});
export type FeaturedProductsOutput = z.infer<
  typeof FeaturedProductsOutputSchema
>;

export async function getFeaturedProducts(): Promise<FeaturedProductsOutput> {
  return featuredProductsFlow();
}

const prompt = ai.definePrompt({
  name: 'featuredProductsPrompt',
  output: {schema: FeaturedProductsOutputSchema},
  prompt: `You are a merchandising assistant that selects products to feature on the homepage.

  Here is a list of all available products:
  ${productNames.join('\n- ')}

  Select 4-6 products to feature on the homepage. Choose a diverse set of products from different categories that would be appealing to a wide audience.
  `,
});

const featuredProductsFlow = ai.defineFlow(
  {
    name: 'featuredProductsFlow',
    outputSchema: FeaturedProductsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
