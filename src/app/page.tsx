import { getQuizOutlets } from '@/app/quiz/data';
import { QuizClient } from '@/app/quiz/quiz-client';

export default function Home() {
  const quizOutlets = getQuizOutlets();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <img src="https://www.saizeriya.com.au/files/logo.png" alt="Saizeriya Logo" />
          </div>
          <h1 className="font-headline text-5xl font-bold text-primary md:text-6xl">
            My Saizeriya Checklist
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Keep track of every Saizeriya outlet you've been to in Singapore. How many have you visited?
          </p>
        </header>
        <QuizClient outlets={quizOutlets} />
      </div>
    </main>
  );
}
