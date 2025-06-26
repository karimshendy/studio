'use server';

/**
 * @fileOverview Suggests suitable furniture options based on room size, style preferences, and color schemes from uploaded photos.
 *
 * - suggestFurnitureOptions - A function that handles the suggestion of furniture options.
 * - SuggestFurnitureOptionsInput - The input type for the suggestFurnitureOptions function.
 * - SuggestFurnitureOptionsOutput - The return type for the suggestFurnitureOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFurnitureOptionsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  stylePreferences: z.string().describe('The preferred style of furniture.'),
  colorSchemes: z.string().describe('The preferred color schemes.'),
});
export type SuggestFurnitureOptionsInput = z.infer<
  typeof SuggestFurnitureOptionsInputSchema
>;

const SuggestFurnitureOptionsOutputSchema = z.object({
  furnitureSuggestions: z
    .string()
    .describe('A list of suggested furniture options.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the furniture suggestions.'),
});
export type SuggestFurnitureOptionsOutput = z.infer<
  typeof SuggestFurnitureOptionsOutputSchema
>;

export async function suggestFurnitureOptions(
  input: SuggestFurnitureOptionsInput
): Promise<SuggestFurnitureOptionsOutput> {
  return suggestFurnitureOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFurnitureOptionsPrompt',
  input: {schema: SuggestFurnitureOptionsInputSchema},
  output: {schema: SuggestFurnitureOptionsOutputSchema},
  prompt: `You are an AI assistant that suggests furniture options based on a photo of a room, style preferences, and color schemes.

  Analyze the photo and consider the user's style and color preferences to provide suitable furniture suggestions.

  Photo: {{media url=photoDataUri}}
  Style Preferences: {{{stylePreferences}}}
  Color Schemes: {{{colorSchemes}}}

  Provide a list of suggested furniture options and the reasoning behind your suggestions.
  `,
});

const suggestFurnitureOptionsFlow = ai.defineFlow(
  {
    name: 'suggestFurnitureOptionsFlow',
    inputSchema: SuggestFurnitureOptionsInputSchema,
    outputSchema: SuggestFurnitureOptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
