'use server';

/**
 * @fileOverview A quiz submission evaluation AI agent.
 *
 * - evaluateQuizSubmission - A function that handles the quiz submission evaluation process.
 * - EvaluateQuizSubmissionInput - The input type for the evaluateQuizSubmission function.
 * - EvaluateQuizSubmissionOutput - The return type for the evaluateQuizSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateQuizSubmissionInputSchema = z.object({
  selectedOutlets: z
    .array(z.string())
    .describe('The list of outlets selected by the user.'),
  correctOutlets: z
    .array(z.string())
    .describe('The list of correct Saizeriya outlets in Singapore.'),
});
export type EvaluateQuizSubmissionInput = z.infer<typeof EvaluateQuizSubmissionInputSchema>;

const EvaluateQuizSubmissionOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the user selected all correct outlets.'),
  comment: z.string().describe('A humorous comment based on the user performance.'),
});
export type EvaluateQuizSubmissionOutput = z.infer<typeof EvaluateQuizSubmissionOutputSchema>;

export async function evaluateQuizSubmission(input: EvaluateQuizSubmissionInput): Promise<EvaluateQuizSubmissionOutput> {
  return evaluateQuizSubmissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateQuizSubmissionPrompt',
  input: {schema: EvaluateQuizSubmissionInputSchema},
  output: {schema: EvaluateQuizSubmissionOutputSchema},
  prompt: `You are a quiz evaluator specializing in Saizeriya outlets in Singapore.

You will evaluate the user's quiz submission to determine if they selected all the correct Saizeriya outlets. Provide a humorous comment based on their performance. The comment should be lighthearted and relevant to the quiz.

Correct Outlets: {{{correctOutlets}}}
Selected Outlets: {{{selectedOutlets}}}

Determine if the selectedOutlets match the correctOutlets and set the isCorrect field accordingly. Then, generate a relevant and humorous comment. For example, if they got it correct say they are a Saizeriya superfan, and if they got it completely wrong, call them a Saizeriya noob.

Keep the comment concise and no more than 2 sentences.
`,
});

const evaluateQuizSubmissionFlow = ai.defineFlow(
  {
    name: 'evaluateQuizSubmissionFlow',
    inputSchema: EvaluateQuizSubmissionInputSchema,
    outputSchema: EvaluateQuizSubmissionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
