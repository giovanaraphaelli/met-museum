const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export interface ObjectIDsResponse {
  objectIDs: number[];
}
export async function fetchObjectIDs(): Promise<number[]> {
  const response = await fetch(`${API_BASE_URL}/objects`, {
    next: {
      revalidate: 86400,
    },
  });

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
}

export async function getArtDetails(id: number): Promise<ArtworkDetails> {
  const response = await fetch(`${API_BASE_URL}/objects/${id}`, {
    next: {
      revalidate: 86400,
    },
  });
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
    url: data.objectURL,
  };
}

export interface ArtworkSearchResult {
  total: number;
  objectIDs: number[] | null;
}

export async function searchArtworks(
  query: string
): Promise<ArtworkSearchResult> {
  const response = await fetch(
    `${API_BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch artworks.');
  }

  const data: Promise<ArtworkSearchResult> = await response.json();

  return data;
}
