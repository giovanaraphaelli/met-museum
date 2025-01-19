const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function fetchObjectIDs() {
  const response = await fetch(`${API_BASE_URL}/objects`, {
    next: {
      revalidate: 86400,
    },
  });

  const data = await response.json();

  return data.objectIDs;
}

async function getArtDetails(id: string) {
  const response = await fetch(`${API_BASE_URL}/objects/${id}`, {
    next: {
      revalidate: 86400,
    },
  });
  const data = await response.json();

  return {
    title: data.title || 'Untitled',
    image: data.primaryImageSmall,
    artist: data.artistDisplayName || 'Unknown Artist',
    artist_bio: data.artistDisplayBio,
    object_date: data.objectDate || 'Date Unknown',
    type: data.objectName || 'Not specified',
    medium: data.medium || 'Not specified',
    department: data.department || 'Not specified',
    url: data.objectURL,
  };
}

export async function getArtOfTheDay() {
  const objectIDs = await fetchObjectIDs();
  const randomIndex = Math.floor(Math.random() * objectIDs.length);
  const artDetails = await getArtDetails(objectIDs[randomIndex]);
  return artDetails;
}
