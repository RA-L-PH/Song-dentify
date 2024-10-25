import axios from 'axios';

const LAST_FM_API_KEY = '4921cfd6997460f4ff8167bfb3ff033e';
const GENIUS_API_KEY = '991d6e3e39msh92bb740926a0e0bp1eda98jsnf7441f34f1de';

export const getSongDetails = async (songName) => {
  try {
    const lastFmResponse = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
      params: {
        method: 'track.getInfo',
        api_key: LAST_FM_API_KEY,
        track: songName,
        format: 'json'
      }
    });

    const track = lastFmResponse.data.track;
    return {
      title: track.name,
      artist: track.artist.name,
      album: track.album?.title || 'Unknown Album',
      url: track.url
    };
  } catch (error) {
    console.error('Error fetching song details from Last.fm:', error);
    throw error;
  }
};

export const getLyrics = async (songName, artistName) => {
  try {
    const geniusResponse = await axios.get(`https://api.genius.com/search`, {
      params: {
        q: `${songName} ${artistName}`
      },
      headers: {
        Authorization: `Bearer ${GENIUS_API_KEY}`
      }
    });

    const song = geniusResponse.data.response.hits[0]?.result;
    if (!song) {
      return 'Lyrics not found.';
    }

    const lyricsPage = await axios.get(song.url);
    const lyrics = lyricsPage.data.match(/<div class="lyrics">([\s\S]*?)<\/div>/)[1];
    return lyrics.replace(/<[^>]*>/g, ''); // Remove HTML tags
  } catch (error) {
    console.error('Error fetching lyrics from Genius:', error);
    return 'Lyrics not found.';
  }
};