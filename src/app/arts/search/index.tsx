'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function search(formData: FormData) {
    const query = formData.get('query') as string;
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <form action={search} className="flex flex-row gap-2 justify-center mb-2">
      <Input
        type="text"
        name="query"
        placeholder="Search for art..."
        defaultValue={''}
        className="border p-2 rounded mr-2 w-full md:w-1/2 lg:w-1/3"
      />
      <Button type="submit" className="w-auto">
        <SearchIcon />
      </Button>
    </form>
  );
}
