import { LoaderCircle } from 'lucide-react';

export function Loading() {
  return (
    <div className="w-full flex justify-center text-primary animate-spin">
      <LoaderCircle />
    </div>
  );
}
