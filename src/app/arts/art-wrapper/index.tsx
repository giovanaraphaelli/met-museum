import {
  ArtsSearchResult,
  getArtDetails,
  IArt,
  searchArts,
  searchDepartments,
} from '@/lib/metMuseumAPI';
import PaginationArts from '../pagination';
import { Art } from './art';

export default async function ArtWrapper({
  query,
  page,
  departmentId,
  departmentName,
}: {
  query?: string;
  departmentId?: number;
  departmentName?: string;
  page: number;
}) {
  let searchResult: ArtsSearchResult | null = null;

  if (query) {
    searchResult = await searchArts(query, page);
  } else if (departmentId) {
    searchResult = await searchDepartments(departmentId, page);
  }

  if (!searchResult || !searchResult.objectIDs) return;

  const { objectIDs, endIndex, startIndex, totalPages } = searchResult;

  const arts: IArt[] = await Promise.all(
    objectIDs.slice(startIndex, endIndex).map((id) => getArtDetails(id))
  );

  return (
    <div>
      <h2 className="text-base lg:text-lg font-sans font-medium py-2">
        {`Found ${objectIDs.length} results for "${query || departmentName}"`}
      </h2>
      <p className="text-sm text-foreground font-sans">{`Page ${page} of ${totalPages}`}</p>
      {arts.map((art) => (
        <Art art={art} key={art.id} />
      ))}
      <PaginationArts totalPages={totalPages} />
    </div>
  );
}
