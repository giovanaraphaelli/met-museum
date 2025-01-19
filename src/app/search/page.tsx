import {
  ArtworkDetails,
  ArtworkSearchResult,
  getArtDetails,
  searchArtworks,
} from '../actions/metMuseumAPI';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SquareArrowOutUpRight } from 'lucide-react';

interface SearchParams {
  q?: string;
}

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = params.q || '';

  const results: ArtworkSearchResult | null = query
    ? await searchArtworks(query)
    : null;

  const artworkDetails: ArtworkDetails[] | null = results?.objectIDs
    ? await Promise.all(
        results.objectIDs.slice(0, 10).map(async (id) => getArtDetails(id))
      )
    : null;

  return (
    <div className="max-w-4xl m-auto rounded flex flex-col gap-1 md:gap-4 p-4">
      <h1 className="text-2xl lg:text-4xl font-serif font-bold text-center">
        Search for Artworks
      </h1>

      <form
        action="/search"
        method="get"
        className="flex flex-col md:flex-row gap-2 justify-center mb-4"
      >
        <Input
          type="text"
          name="q"
          placeholder="Search for art..."
          defaultValue={''}
          className="border p-2 rounded mr-2 w-full md:w-1/2 lg:w-1/3"
        />
        <Button type="submit" className="w-full md:w-auto">
          Search
        </Button>
      </form>

      {artworkDetails ? (
        <div className="h-[calc(100vh-16rem)] overflow-y-scroll pr-4">
          {artworkDetails.map((art, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 border-b border-secondary py-4"
            >
              {art.image ? (
                <div className="w-full md:w-40 h-60 relative">
                  <Image
                    src={art.image}
                    alt={art.title || 'Artwork'}
                    layout="fill"
                    priority
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div className="h-60 w-40 bg-card text-xs flex justify-center items-center p-2">
                  <p>No image available for this artwork.</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">{art.title}</h2>
                <ul className="font-serif text-sm font-semibold">
                  <li>
                    <strong>Artist: </strong>
                    {art.artist}
                  </li>
                  <li>
                    <strong>Date: </strong>
                    {art.object_date}
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
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default SearchPage;
