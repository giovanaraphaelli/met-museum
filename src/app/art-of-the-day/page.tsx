import { SquareArrowOutUpRight } from 'lucide-react';
import { getArtOfTheDay } from '../actions/get-art-of-the-day';
import Image from 'next/image';

export default async function ArtOfTheDay() {
  const art = await getArtOfTheDay();

  if (!art) {
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

  return (
    <div className="max-w-4xl h-full m-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-start">
      <div className="flex gap-4 flex-col">
        <h1 className="text-3xl font-bold font-serif">{art.title}</h1>
        <h2 className="text-xl font-serif">
          {art.artist} - {`(${art.object_date})`}
        </h2>
        {art.artist_bio && <p>{art.artist_bio}</p>}
        <ul className="font-serif text-lg">
          <li>
            <strong>Medium:</strong> {art.medium}
          </li>
          <li>
            <strong>Classification:</strong> {art.type}
          </li>
          <li>
            <strong>Department:</strong> {art.department}
          </li>
        </ul>
        {art.url && (
          <a
            className="flex gap-1 text-sm items-center text-primary font-sans"
            href={art.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            See more <SquareArrowOutUpRight size={12} />
          </a>
        )}
      </div>

      <div className="p-6 bg-card flex justify-center items-center rounded min-h-64">
        {art.image ? (
          <Image
            src={art.image}
            alt={art.title || 'Artwork'}
            width={300}
            height={300}
            className="w-auto h-auto"
          />
        ) : (
          <p>No image available for this artwork.</p>
        )}
      </div>
    </div>
  );
}
