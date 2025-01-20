import { Suspense } from 'react';
import { Art } from './art';
import { Search } from './search';
import { Loading } from '@/components/loading';
import { DepartmentsSearch } from './search-departments';
import { DepartmentsResponse, getDepartments } from '../../lib/metMuseumAPI';

export default async function ArtsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const { departments }: DepartmentsResponse = await getDepartments();

  return (
    <div className="max-w-4xl m-auto rounded flex flex-col gap-1 md:gap-4 p-4">
      <h1 className="text-2xl lg:text-4xl font-serif font-bold text-center">
        Search for Artworks
      </h1>
      <Search />
      <Suspense fallback={<Loading />} key={query}>
        <DepartmentsSearch query={query} departments={departments} />
        <Art query={query} />
      </Suspense>
    </div>
  );
}
