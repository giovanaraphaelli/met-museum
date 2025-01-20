'use client';

import { Department } from '@/app/lib/metMuseumAPI';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function DepartmentsSearch({
  query,
  departments,
}: {
  query: string;
  departments: Department[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(departmentId: string) {
    const params = new URLSearchParams(searchParams);

    if (departmentId) {
      params.set('query', departmentId.toString());
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  if (query === '') {
    return (
      <div className=" flex flex-col justify-center items-start gap-6 pt-6">
        <h2 className="self-center font-sans text-base lg:text-xl">
          Try searching for:
        </h2>
        <ul className="flex justify-center flex-wrap gap-2">
          {departments.map((department) => {
            return (
              <li key={department.departmentId}>
                <span
                  onClick={() => handleSearch(department.displayName)}
                  className="font-sans text-xs lg:text-sm text-white bg-primary py-1 px-2 rounded-xl cursor-pointer hover:bg-primary/90"
                >
                  {department.displayName}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
