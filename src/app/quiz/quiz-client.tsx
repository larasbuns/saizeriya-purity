'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { correctOutlets } from './data';

const FormSchema = z.object({
  outlets: z.array(z.string()),
});

type QuizClientProps = {
  outlets: string[];
};

export function QuizClient({ outlets }: QuizClientProps) {
  const [visitedCount, setVisitedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      outlets: [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const selected = value.outlets || [];
      setVisitedCount(selected.length);
      setProgress((selected.length / correctOutlets.length) * 100);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const score = data.outlets.length;
    router.push(`/results?score=${score}`);
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg border-2 border-primary/10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Saizeriya Outlet Checklist</CardTitle>
            <CardDescription>Select the outlets you have been to.</CardDescription>
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
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4 items-start">
             <div className="w-full text-center">
                <p className="font-bold text-lg text-primary">{visitedCount} / {correctOutlets.length} visited</p>
                <Progress value={progress} className="mt-2 h-3" />
            </div>
            <Button type="submit" className="w-full mt-4">See My Results</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
