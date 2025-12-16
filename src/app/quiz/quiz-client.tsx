'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';

import { submitQuiz, type QuizState } from '@/app/actions';
import { SubmitButton } from './submit-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Award } from 'lucide-react';

const FormSchema = z.object({
  outlets: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

type QuizClientProps = {
  outlets: string[];
};

export function QuizClient({ outlets }: QuizClientProps) {
  const initialState: QuizState = {};
  const [state, formAction] = useFormState(submitQuiz, initialState);
  const [showResult, setShowResult] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      outlets: [],
    },
  });

  useEffect(() => {
    if (state?.comment) {
      setShowResult(true);
    }
    if (state?.message) {
      // Potentially show a toast for errors
    }
  }, [state]);

  const handleTryAgain = () => {
    form.reset();
    setShowResult(false);
  };

  if (showResult && state.comment) {
    return (
      <Card className="w-full max-w-2xl shadow-xl animate-in fade-in zoom-in-95">
        <CardHeader className="items-center text-center">
            {state.isCorrect ? (
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-2" />
            ) : (
                <XCircle className="h-16 w-16 text-destructive mb-2" />
            )}
          <CardTitle className="text-2xl">Quiz Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-muted-foreground">{state.comment}</p>
        </CardContent>
        <CardFooter className="flex-col gap-4">
            {state.isCorrect && (
                <div className="flex items-center gap-2 rounded-md bg-yellow-100 p-3 text-yellow-800 border border-yellow-200">
                    <Award className="h-6 w-6"/>
                    <p className="font-semibold">Certified Saizeriya Superfan!</p>
                </div>
            )}
          <Button onClick={handleTryAgain} className="w-full" variant="outline">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg border-2 border-primary/10">
      <Form {...form}>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>The Ultimate Saizeriya Challenge</CardTitle>
            <CardDescription>Which of the following are actual Saizeriya outlets in Singapore?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="outlets"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {outlets.map((outlet) => (
                      <FormField
                        key={outlet}
                        control={form.control}
                        name="outlets"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={outlet}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors hover:bg-black/5"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(outlet)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, outlet])
                                      : field.onChange(field.value?.filter((value) => value !== outlet));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{outlet}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {state?.message && !state.comment && (
              <Alert variant="destructive">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
