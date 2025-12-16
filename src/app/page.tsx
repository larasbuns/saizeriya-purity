import { getQuizOutlets } from '@/app/quiz/data';
import { QuizClient } from '@/app/quiz/quiz-client';

export default function Home() {
  const quizOutlets = getQuizOutlets();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 200 200"
              aria-label="Saizeriya Logo"
            >
              <g>
                <path
                  fill="#006837"
                  d="M100,10c-22.1,0-40,17.9-40,40s17.9,40,40,40s40-17.9,40-40S122.1,10,100,10z"
                />
                <path
                  fill="#ffffff"
                  d="M100,18c-17.6,0-32,14.4-32,32s14.4,32,32,32s32-14.4,32-32S117.6,18,100,18z"
                />
                <path
                  fill="#006837"
                  d="M100,26c-13.2,0-24,10.8-24,24s10.8,24,24,24s24-10.8,24-24S113.2,26,100,26z"
                />
                <path
                  fill="#ffffff"
                  d="M100,34c-8.8,0-16,7.2-16,16s7.2,16,16,16s16-7.2,16-16S108.8,34,100,34z"
                />
                <polygon
                  fill="#ce1126"
                  points="100,80 120,95 100,110 80,95"
                />
                <path
                  fill="#ce1126"
                  d="M100,120l-40,10v20l40,10l40-10v-20L100,120z M100,152l-32-8v-12l32,8l32-8v12L100,152z"
                />
                <text
                  x="100"
                  y="185"
                  fontFamily="sans-serif"
                  fontSize="20"
                  fill="#3a2e25"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  SAIZERIYA
                </text>
              </g>
            </svg>
          </div>
          <h1 className="font-headline text-5xl font-bold text-primary md:text-6xl">
            Saizeriya Fan Finder
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Think you know your Saizeriya? Select all the real outlets in Singapore to prove you're a true fan.
          </p>
        </header>
        <QuizClient outlets={quizOutlets} />
      </div>
    </main>
  );
}
