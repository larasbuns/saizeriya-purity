'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent"
      size="lg"
    >
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
      {pending ? 'Evaluating...' : 'Submit My Answers'}
    </Button>
  );
}
