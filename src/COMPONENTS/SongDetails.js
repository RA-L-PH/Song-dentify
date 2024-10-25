import React from 'react';
import '../CSS/SongDetails.css'; // Import the CSS file for styling

const SongDetails = ({ songName, artistName }) => (
  <div className="song-details">
    <h3 className="song-title">Song: {songName}</h3>
    <p className="artist-name">Artist: {artistName}</p>
    {/* Additional information or links can go here */}
  </div>
);

export default SongDetails;