import { LoaderCircle } from 'lucide-react';

export function LoadingComponent() {
  return (
    <div className="w-full flex justify-center text-primary animate-spin">
      <LoaderCircle />
    </div>
  );
}
