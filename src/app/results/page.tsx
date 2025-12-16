'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { correctOutlets } from '@/app/quiz/data';

function Results() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0', 10);
  const total = correctOutlets.length;

  let title = '';
  let description = '';

  if (score === 0) {
    title = 'Saizeriya Newbie';
    description = "Looks like you're just getting started on your Saizeriya journey!";
  } else if (score >= 1 && score <= 10) {
    title = 'Saizeriya Explorer';
    description = 'You\'ve visited a few outlets. Keep exploring, there are many more to discover!';
  } else if (score >= 11 && score <= 24) {
    title = 'Saizeriya Regular';
    description = 'You clearly enjoy Saizeriya! You\'re well on your way to becoming a true fan.';
  } else if (score >= 25 && score < total) {
    title = 'Saizeriya Super Fan';
    description = 'Wow! You\'ve been to an impressive number of outlets. You\'re a dedicated fan!';
  } else if (score === total) {
    title = 'Ultimate Saizeriya Master';
    description = 'Incredible! You have visited every single Saizeriya in Singapore. You are a true legend!';
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-5xl text-primary">{title}</CardTitle>
          <CardDescription className="text-lg">You've visited</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="text-7xl font-bold text-accent">
            {score}<span className="text-3xl text-muted-foreground">/{total}</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-md">{description}</p>
          <Button asChild className="mt-6">
            <Link href="/">Try Again</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}


export default function ResultsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Results />
        </Suspense>
    )
}
