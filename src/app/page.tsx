import { getQuizOutlets } from '@/app/quiz/data';
import { QuizClient } from '@/app/quiz/quiz-client';
import { Pizza } from 'lucide-react';

export default function Home() {
  const quizOutlets = getQuizOutlets();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <header className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary p-4 text-primary-foreground shadow-lg">
                <Pizza className="h-10 w-10" />
            </div>
          <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            Saizeriya Fan Finder
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-md">
            Think you know your Saizeriya? Select all the real outlets in Singapore to prove you're a true fan.
          </p>
        </header>
        <QuizClient outlets={quizOutlets} />
      </div>
    </main>
  );
}
