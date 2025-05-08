import { createFileRoute } from '@tanstack/react-router';
import { Alert, AlertDescription, AlertTitle } from '@acme/ui/alert';
import { Button } from '@acme/ui/button';
import { cn } from '@acme/ui';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3 className={cn('text-2xl font-bold')}>Welcome Home!!!</h3>
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>

      <Button>Click me</Button>
    </div>
  );
}
