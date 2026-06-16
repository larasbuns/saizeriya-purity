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

  if (score <=2) {
    title = 'Saizeriya Infant';
    description = "You are too innocent, yet to be deflowered by the best restaurant on earth.";
  } else if (score >= 2 && score <= 10) {
    title = 'Casual Relationship with Saizeriya';
    description = 'You have been exploring but not locked in yet';
  } else if (score >= 11 && score <= 20) {
    title = 'Saizeriya Situationship";
    description = 'You have a fond liking for Saizeriya but do you see a future with Saizeriya';
  } else if (score >= 20 && score <= total) {
    title = 'Saizeriya 4 life';
    description = 'You took Saizeriya as you wedded lover, in sickness or death <3';
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
