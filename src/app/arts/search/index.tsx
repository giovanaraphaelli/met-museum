'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import Link from 'next/link';

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
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form action={search} className="flex flex-row gap-2 justify-center mb-2">
      <div className="relative w-full">
        <Input
          type="text"
          name="query"
          placeholder="Search for art..."
          defaultValue={searchParams.get('query')?.toString()}
          className="border p-2 rounded w-full pr-10 font-sans"
        />
        <Link
          href="/arts"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:bg-foreground/10 p-1 rounded"
        >
          <X size={16} />
        </Link>
      </div>
      <Button type="submit" className="w-auto">
        <SearchIcon />
      </Button>
    </form>
  );
}
