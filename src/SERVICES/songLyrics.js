export const getSongLyricsLink = (trackName, artistName) => {
  try {
    // Construct the Genius search URL
    const searchUrl = `https://genius.com/search?q=${encodeURIComponent(trackName)} ${encodeURIComponent(artistName)}`;

    // Generate an anchor HTML string with the search URL
    const linkHtml = `<a href="${searchUrl}" target="_blank" rel="noopener noreferrer">View Lyrics on Genius</a>`;
    
    return linkHtml;
  } catch (error) {
    console.error('Error generating link:', error);
    return null;
  }
};