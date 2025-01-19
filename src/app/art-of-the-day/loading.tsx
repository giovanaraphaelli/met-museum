import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="h-[calc(100vh-72px)] flex justify-center items-center text-primary">
      <div className="max-w-4xl h-full m-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-start">
        <div className="flex gap-4 flex-col">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <ul className="font-serif text-lg space-y-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-1/3" />
          </ul>
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-64 w-64 rounded" />
      </div>
    </div>
  );
}
