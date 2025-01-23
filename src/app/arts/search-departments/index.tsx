'use client';

import { Button } from '@/components/ui/button';
import { IDepartment } from '@/lib/metMuseumAPI';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function DepartmentsSearch({
  isHidden,
  availableDepartments,
}: {
  isHidden: boolean;
  availableDepartments: IDepartment[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(displayName: string) {
    const params = new URLSearchParams(searchParams);

    if (displayName) {
      params.set('department', displayName.toString());
    } else {
      params.delete('department');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }

  if (isHidden) {
    return (
      <div className=" flex flex-col justify-center items-start gap-6 pt-6">
        <h2 className="self-center font-sans text-base lg:text-xl font-medium">
          Discover the MET departments:
        </h2>
        <ul className="flex justify-center flex-wrap gap-2">
          {availableDepartments.map((department) => {
            return (
              <li key={department.departmentId}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSearch(department.displayName)}
                >
                  {department.displayName}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
