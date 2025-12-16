'use server';

import { evaluateQuizSubmission } from '@/ai/flows/evaluate-quiz-submission';
import { correctOutlets } from '@/app/quiz/data';
import { z } from 'zod';

export interface QuizState {
  comment?: string | null;
  isCorrect?: boolean | null;
  errors?: {
    outlets?: string[];
  };
  message?: string | null;
}

const QuizSchema = z.object({
  outlets: z.array(z.string()).min(1, { message: 'Please select at least one outlet.' })
});

export async function submitQuiz(prevState: QuizState, formData: FormData): Promise<QuizState> {
  const selectedOutlets = formData.getAll('outlets') as string[];
  
  const validatedFields = QuizSchema.safeParse({
    outlets: selectedOutlets,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please select at least one option.',
    };
  }

  try {
    const result = await evaluateQuizSubmission({
      selectedOutlets,
      correctOutlets,
    });
    
    return {
      comment: result.comment,
      isCorrect: result.isCorrect,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred during evaluation. Please try again.',
    };
  }
}
