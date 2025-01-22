import { Suspense } from 'react';
import {
  DepartmentsResponse,
  getAvailableDepartments,
} from '../../lib/metMuseumAPI';

import { LoadingComponent } from '@/components/loading';
import { Search } from './search';
import { DepartmentsSearch } from './search-departments';
import ArtWrapper from './art-wrapper';

export default async function ArtsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    department?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const department = searchParams?.department || '';
  const page = Number(searchParams?.page) || 1;
  const key = `${query}-${department}-${page}`;

  const { departments: availableDepartments }: DepartmentsResponse =
    await getAvailableDepartments();

  const departmentActive = availableDepartments.find(
    (dept) => dept.displayName === department
  );

  return (
    <div className="max-w-4xl m-auto rounded flex flex-col gap-1 md:gap-4 p-4">
      <h1 className="text-2xl lg:text-4xl font-serif font-bold text-center">
        Search for Artworks
      </h1>
      <Search />
      <DepartmentsSearch
        availableDepartments={availableDepartments}
        isHidden={query === '' && department === ''}
      />
      <Suspense fallback={<LoadingComponent />} key={key}>
        <ArtWrapper
          query={query}
          page={page}
          departmentId={departmentActive?.departmentId}
          departmentName={department}
        />
      </Suspense>
    </div>
  );
}
