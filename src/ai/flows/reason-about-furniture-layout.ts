// src/ai/flows/reason-about-furniture-layout.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for reasoning about the best furniture layout for a room using AR.
 *
 * - reasonAboutFurnitureLayout - A function that takes room dimensions and selected furniture items as input and returns the optimal furniture arrangement.
 * - ReasonAboutFurnitureLayoutInput - The input type for the reasonAboutFurnitureLayout function.
 * - ReasonAboutFurnitureLayoutOutput - The return type for the reasonAboutFurnitureLayout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReasonAboutFurnitureLayoutInputSchema = z.object({
  roomDimensions: z
    .string()
    .describe('The dimensions of the room (e.g., 10ft x 12ft).'),
  selectedFurniture: z
    .string()
    .describe(
      'A list of selected furniture items with their dimensions (e.g., Sofa: 7ft x 3ft, Coffee Table: 4ft x 2ft)'
    ),
  stylePreferences: z
    .string()
    .optional()
    .describe('Optional style preferences for the furniture arrangement.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "Optional photo of the room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ReasonAboutFurnitureLayoutInput = z.infer<
  typeof ReasonAboutFurnitureLayoutInputSchema
>;

const ReasonAboutFurnitureLayoutOutputSchema = z.object({
  layoutDescription: z
    .string()
    .describe('A detailed description of the optimal furniture layout.'),
});
export type ReasonAboutFurnitureLayoutOutput = z.infer<
  typeof ReasonAboutFurnitureLayoutOutputSchema
>;

export async function reasonAboutFurnitureLayout(
  input: ReasonAboutFurnitureLayoutInput
): Promise<ReasonAboutFurnitureLayoutOutput> {
  return reasonAboutFurnitureLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reasonAboutFurnitureLayoutPrompt',
  input: {schema: ReasonAboutFurnitureLayoutInputSchema},
  output: {schema: ReasonAboutFurnitureLayoutOutputSchema},
  prompt: `You are an expert interior designer specializing in furniture layout and spatial planning.

You will receive the dimensions of a room, a list of selected furniture items with their dimensions, optional style preferences, and optionally a photo of the room. You will use this information to determine the optimal furniture layout for the room.

Room Dimensions: {{{roomDimensions}}}
Selected Furniture: {{{selectedFurniture}}}
Style Preferences: {{stylePreferences}}
Photo: {{#if photoDataUri}}{{media url=photoDataUri}}{{else}}No photo provided.{{/if}}

Consider factors such as traffic flow, focal points, and overall aesthetics. Provide a detailed description of the optimal furniture layout, including the placement of each item.
`,
});

const reasonAboutFurnitureLayoutFlow = ai.defineFlow(
  {
    name: 'reasonAboutFurnitureLayoutFlow',
    inputSchema: ReasonAboutFurnitureLayoutInputSchema,
    outputSchema: ReasonAboutFurnitureLayoutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
