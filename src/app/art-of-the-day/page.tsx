import { Button } from '@/components/ui/button';
import Link from 'next/link';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

let cachedObjectIDs: number[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000;

async function fetchObjectIDs() {
  const now = Date.now();

  if (
    cachedObjectIDs &&
    cacheTimestamp &&
    now - cacheTimestamp < CACHE_DURATION
  ) {
    return cachedObjectIDs;
  }

  const response = await fetch(`${API_BASE_URL}/objects`);
  const data = await response.json();

  cachedObjectIDs = Array.isArray(data.objectIDs) ? data.objectIDs : [];
  cacheTimestamp = now;

  return cachedObjectIDs;
}

export default async function ArtOfTheDay() {
  const objectIDs = await fetchObjectIDs();

  if (!objectIDs) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-4xl lg:text-6xl font-serif font-bold">
          Art of the day
        </h1>
        <p className="font-sans text-xs lg:text-sm text-gray-500">
          No art available at the moment. Please try again later.
        </p>
      </div>
    );
  }

  const randomIndex = Math.floor(Math.random() * objectIDs.length);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-1">
      <h1 className="text-4xl lg:text-6xl font-serif font-bold">
        Art of the day
      </h1>
      <p className="font-sans text-xs lg:text-sm ">Discover new art today.</p>
      <Button className="min-w-24 mt-4">
        <Link href={`/art-of-the-day/${objectIDs[randomIndex]}`}>
          {`Let's find`}
        </Link>
      </Button>
    </div>
  );
}
