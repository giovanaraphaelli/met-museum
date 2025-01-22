import { IArt } from '@/lib/metMuseumAPI';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';

export async function Art({ art }: { art: IArt }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border-b border-secondary py-4 items-start">
      {/* Imagem */}
      {art.image ? (
        <div className="w-full md:w-60 h-60 relative bg-card rounded flex-shrink-0">
          <Image
            src={art.image}
            alt={art.title || 'Artwork'}
            fill
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            unoptimized={true}
            priority={true}
          />
        </div>
      ) : (
        <div className="w-full md:w-60 h-60 bg-card text-xs flex justify-center items-center p-2 rounded flex-shrink-0">
          <p>No image available for this artwork.</p>
        </div>
      )}

      {/* Informações */}
      <div className="flex flex-col gap-2 flex-grow">
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
            <strong className="font-medium">Classification:</strong> {art.type}
          </li>
          <li>
            <strong className="font-medium">Department:</strong>{' '}
            {art.department}
          </li>
          <li>
            <strong className="font-medium">Country:</strong> {art.country}
          </li>
        </ul>

        {/* Link para mais informações */}
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
  );
}
