const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export interface ObjectIDsResponse {
  objectIDs: number[];
}
export async function getAvailableIDs(): Promise<number[]> {
  const response = await fetch(`${API_BASE_URL}/objects`);

  if (!response.ok) throw new Error('Failed to fetch artworks ids.');

  const data: ObjectIDsResponse = await response.json();

  return data.objectIDs;
}

export interface IDepartment {
  departmentId: number;
  displayName: string;
}
export interface DepartmentsResponse {
  departments: IDepartment[];
}

export async function getAvailableDepartments(): Promise<DepartmentsResponse> {
  const response = await fetch(`${API_BASE_URL}/departments`, {
    cache: 'force-cache',
  });

  if (!response.ok) throw new Error('Failed to fetch artworks ids.');

  const data: DepartmentsResponse = await response.json();

  return data;
}

export interface IArt {
  id: number;
  title: string;
  image: string;
  additionalImages: string[] | [];
  artist: string;
  artist_bio: string | null;
  object_date: string;
  type: string;
  medium: string;
  department: string;
  url: string;
  country: string;
}

export async function getArtDetails(id: number): Promise<IArt> {
  const response = await fetch(`${API_BASE_URL}/objects/${id}`);

  const data = await response.json();

  return {
    id: data.objectID,
    title: data.title || 'Untitled',
    image: data.primaryImageSmall,
    additionalImages: data.additionalImages,
    artist: data.artistDisplayName || 'Unknown Artist',
    artist_bio: data.artistDisplayBio || null,
    object_date: data.objectDate || 'Date Unknown',
    type: data.objectName || 'Not specified',
    medium: data.medium || 'Not specified',
    department: data.department || 'Not specified',
    country: data.country || 'Not specified',
    url: data.objectURL || '',
  };
}

export interface ArtsSearchResult {
  objectIDs: number[] | null;
  endIndex: number;
  startIndex: number;
  totalPages: number;
}

export async function searchArts(
  query: string,
  currentPage: number
): Promise<ArtsSearchResult> {
  const response = await fetch(
    `${API_BASE_URL}/search?isHighlight=true&q=${encodeURIComponent(query)}`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch artworks.');
  }

  const data: Promise<{ total: number; objectIDs: number[] }> =
    await response.json();
  const { objectIDs, total } = await data;

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const totalPages = Math.ceil(total / 10);

  return { startIndex, endIndex, objectIDs, totalPages };
}

export async function searchDepartments(
  id: number,
  currentPage: number
): Promise<ArtsSearchResult> {
  const response = await fetch(
    `${API_BASE_URL}/objects?departmentIds=${id}&isHighlight=true`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch artworks.');
  }

  const data: Promise<{ total: number; objectIDs: number[] }> =
    await response.json();
  const { objectIDs, total } = await data;

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const totalPages = Math.ceil(total / 10);

  return { startIndex, endIndex, objectIDs, totalPages };
}
