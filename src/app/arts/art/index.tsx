import {
  ArtsSearchResult,
  ArtworkDetails,
  getArtDetails,
  searchArts,
} from '@/lib/metMuseumAPI';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';

export async function Art({ query }: { query: string }) {
  const results: ArtsSearchResult = await searchArts(query);

  const artDetails: ArtworkDetails[] | null = results?.objectIDs
    ? await Promise.all(
        results.objectIDs.slice(0, 100).map(async (id) => getArtDetails(id))
      )
    : null;

  return (
    <>
      {artDetails?.map((art, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-4 border-b border-secondary py-4"
        >
          {art.image ? (
            <div className="w-full md:w-60 h-60 relative">
              <Image
                src={art.image}
                alt={art.title || 'Artwork'}
                priority
                fill={true}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="h-60 w-240 bg-card text-xs flex justify-center items-center p-2">
              <p>No image available for this artwork.</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h2 className="text-xl lg:text-2xl font-bold font-serif">
              {art.title}
            </h2>
            <ul className="font-sans text-sm lg:text-base">
              <li>
                <strong className="font-medium">Artist: </strong>
                {art.artist}
              </li>
              <li>
                <strong className="font-medium">Date: </strong>
                {art.object_date}
              </li>
              <li>
                <strong className="font-medium">Medium:</strong> {art.medium}
              </li>
              <li>
                <strong className="font-medium">Classification:</strong>{' '}
                {art.type}
              </li>
              <li>
                <strong className="font-medium">Department:</strong>{' '}
                {art.department}
              </li>
              <li>
                <strong className="font-medium">Country:</strong> {art.country}
              </li>
            </ul>

            {art.url && (
              <a
                className="flex gap-1 text-sm items-center text-primary font-sans w-max p-1 mt-2"
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                See more <SquareArrowOutUpRight size={12} />
              </a>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
