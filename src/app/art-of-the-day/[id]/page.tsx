import { ArrowLeft, SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

interface ItemParams {
  params: {
    id: string;
  };
}

async function getArtDetails(id: string) {
  const response = await fetch(`${API_BASE_URL}/objects/${id}`);
  const data = await response.json();

  return {
    title: data.title || 'Untitled',
    image: data.primaryImageSmall,
    artist: data.artistDisplayName || 'Unknown Artist',
    artist_bio: data.artistDisplayBio,
    object_date: data.objectDate || 'Date Unknown',
    type: data.objectName || 'Not specified',
    medium: data.medium || 'Not specified',
    department: data.department || 'Not specified',
    url: data.objectURL,
  };
}

export default async function ArtItem({ params }: ItemParams) {
  const { id } = await params;
  const art = await getArtDetails(id);

  return (
    <div className="max-w-4xl h-full m-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-start">
      <div className="flex gap-4 flex-col">
        <div className="flex gap-1 text-sm items-center text-primary font-sans">
          <ArrowLeft size={14} />
          <Link href="/art-of-the-day">to go back</Link>
        </div>
        <h1 className="text-3xl font-bold font-serif">{art.title}</h1>
        <h2 className="text-xl font-serif">
          {art.artist}- {`(${art.object_date})`}
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
        <div className="flex gap-1 text-sm items-center text-primary font-sans">
          <Link href={art.url} target="_blank">
            see more{' '}
          </Link>
          <SquareArrowOutUpRight size={12} />
        </div>
      </div>

      <div className="p-6 bg-card flex justify-center items-center rounded min-h-64">
        {art.image ? (
          <Image
            src={art.image}
            alt={art.title || 'Artwork'}
            width={300}
            height={300}
          />
        ) : (
          <p>No image available for this artwork.</p>
        )}
      </div>
    </div>
  );
}
