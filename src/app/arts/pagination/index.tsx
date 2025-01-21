'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationArts({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (page < 1 || page > totalPages) {
    return null;
  }

  return (
    <Pagination className="font-sans p-6">
      <PaginationContent>
        <PaginationItem
          onClick={() => handlePageChange(page - 1)}
          className={`${
            page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
          }`}
          aria-disabled={page <= 1}
        >
          <PaginationPrevious />
        </PaginationItem>

        {page > 1 && (
          <PaginationItem>
            <PaginationLink
              aria-label={`Página ${page - 1}`}
              isActive={false}
              onClick={() => handlePageChange(page - 1)}
              className="cursor-pointer"
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            aria-label={`Página atual, ${page}`}
            isActive
            className="cursor-default"
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < totalPages && (
          <PaginationItem>
            <PaginationLink
              aria-label={`Página ${page + 1}`}
              isActive={false}
              onClick={() => handlePageChange(page + 1)}
              className="cursor-pointer"
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem
          onClick={() => handlePageChange(page + 1)}
          className={`${
            page >= totalPages
              ? 'pointer-events-none opacity-50'
              : 'cursor-pointer'
          }`}
          aria-disabled={page >= totalPages}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
