import { Loading } from '@/components/loading';
import { Suspense } from 'react';
import {
  ArtsSearchResult,
  IArt,
  DepartmentsResponse,
  getArtDetails,
  getDepartments,
  searchArts,
} from '../../lib/metMuseumAPI';
import { Art } from './art';
import { Search } from './search';
import { DepartmentsSearch } from './search-departments';
import PaginationArts from './pagination';

export default async function ArtsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;

  const { objectIDs, endIndex, startIndex, totalPages }: ArtsSearchResult =
    await searchArts(query, page);

  const arts: IArt[] | null = objectIDs
    ? await Promise.all(
        objectIDs
          .slice(startIndex, endIndex)
          .map(async (id) => getArtDetails(id))
      )
    : null;

  const { departments }: DepartmentsResponse = await getDepartments();

  return (
    <div className="max-w-4xl m-auto rounded flex flex-col gap-1 md:gap-4 p-4">
      <h1 className="text-2xl lg:text-4xl font-serif font-bold text-center">
        Search for Artworks
      </h1>
      <Search />
      <Suspense fallback={<Loading />} key={query}>
        <DepartmentsSearch query={query} departments={departments} />
        {arts?.map((art) => (
          <Art art={art} key={art.id} />
        ))}
        <PaginationArts totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
