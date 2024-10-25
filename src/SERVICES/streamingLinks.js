// SERVICES/streamingLinks.js
export const getStreamingLinks = async (songName, artistName) => {
  const query = `${songName} ${artistName}`;
  
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '991d6e3e39msh92bb740926a0e0bp1eda98jsnf7441f34f1de',
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const track = data.data[0];

    if (track) {
      const deezerLink = track.link;

      return [
        {
          platform: 'Deezer',
          url: deezerLink,
        },
        {
          platform: 'YouTube Music',
          url: `https://music.youtube.com/search?q=${encodeURIComponent(query)}`,
        },
        {
          platform: 'Apple Music',
          url: `https://music.apple.com/search?term=${encodeURIComponent(query)}`,
        },
        {
          platform: 'Spotify',
          url: `https://open.spotify.com/search/${encodeURIComponent(query)}`,
        },
      ];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching streaming links:', error);
    return [];
  }
};