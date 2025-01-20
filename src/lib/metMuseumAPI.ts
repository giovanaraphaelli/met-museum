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

export interface ArtworkDetails {
  id: number;
  title: string;
  image: string;
  artist: string;
  artist_bio: string | null;
  object_date: string;
  type: string;
  medium: string;
  department: string;
  url: string;
  country: string;
}

export async function getArtDetails(id: number): Promise<ArtworkDetails> {
  const response = await fetch(`${API_BASE_URL}/objects/${id}`);

  const data = await response.json();

  return {
    id: data.objectID,
    title: data.title || 'Untitled',
    image: data.primaryImageSmall,
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
  total: number;
  objectIDs: number[] | null;
}

export async function searchArts(query: string): Promise<ArtsSearchResult> {
  const response = await fetch(
    `${API_BASE_URL}/search?isHighlight=true&q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch artworks.');
  }

  const data: Promise<ArtsSearchResult> = await response.json();

  return data;
}

export interface Department {
  departmentId: number;
  displayName: string;
}

export interface DepartmentsResponse {
  departments: Department[];
}

export async function getDepartments(): Promise<DepartmentsResponse> {
  const response = await fetch(`${API_BASE_URL}/departments`, {
    cache: 'force-cache',
  });

  if (!response.ok) throw new Error('Failed to fetch artworks ids.');

  const data: DepartmentsResponse = await response.json();

  return data;
}
