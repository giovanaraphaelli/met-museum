'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function search(formData: FormData) {
    const params = new URLSearchParams(searchParams);
    const query = formData.get('query') as string;
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function clearSearch() {
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    replace(`${pathname}?${params.toString()}`); // Remove o parâmetro da URL
  }

  return (
    <form action={search} className="flex flex-row gap-2 justify-center mb-2">
      <div className="relative w-full md:w-1/2 lg:w-1/3">
        <Input
          type="text"
          name="query"
          placeholder="Search for art..."
          defaultValue={searchParams.get('query')?.toString()}
          className="border p-2 rounded w-full pr-10"
        />
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:bg-foreground/10 p-1 rounded"
        >
          <X size={16} />
        </button>
      </div>
      <Button type="submit" className="w-auto">
        <SearchIcon />
      </Button>
    </form>
  );
}
