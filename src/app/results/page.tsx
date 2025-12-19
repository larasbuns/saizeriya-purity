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
    title = 'Saizeriya Infant';
    description = "You are seriously missing out on the best Japanese-Italian Restaurant on the market.";
  } else if (score >= 1 && score <= 10) {
    title = 'Saizeriya Toddler';
    description = 'You either do not go to Saizeriya often or stay loyal to a few outlets.';
  } else if (score >= 11 && score <= 24) {
    title = 'Mid Saizeriya Fan';
    description = 'Could be better, but not something you\'d ever say about my beloved tiramisu.';
  } else if (score >= 25 && score < total) {
    title = 'Ranked Saizeriya Fan';
    description = 'Wow. Saizeriya consumption is a competition to you, but the ravioli remains undefeated. ';
  } else if (score === total) {
    title = 'Saizeriya GOAT';
    description = 'Incredible! You’ve visited every Saizeriya in Singapore. If anyone can summon the discontinued squid ink, it’s you.';
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
