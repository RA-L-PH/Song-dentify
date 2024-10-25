import React, { useState, useRef } from 'react';
import { recognizeAudio } from '../SERVICES/audioRecognition';
import { getSongLyricsLink } from '../SERVICES/songLyrics';
import { getStreamingLinks } from '../SERVICES/streamingLinks';
import SongDetails from './SongDetails';
import '../CSS/AudioRecorder.css';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [lyricsLink, setLyricsLink] = useState('');
  const [links, setLinks] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    setIsRecording(true);
    audioChunks.current = [];
    console.log('Recording started');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setRecording(audioBlob);
        setAudioURL(URL.createObjectURL(audioBlob));
      };

      mediaRecorderRef.current.start();
    } catch (err) {
      console.error('Error accessing the microphone:', err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSongRecognition = async () => {
    if (recording) {
      try {
        console.log('Starting song recognition...');
        const songDetails = await recognizeAudio(recording);
        console.log('Song recognition response:', songDetails);

        if (songDetails) {
          setSongName(songDetails.title);
          setArtistName(songDetails.artist);
        }
      } catch (error) {
        console.error('Error recognizing song:', error);
      }
    }
  };

  const handleGetLyrics = () => {
    const linkHtml = getSongLyricsLink(songName, artistName);
    setLyricsLink(linkHtml);
  };

  const handleGetLinks = async () => {
    try {
      const streamingLinks = await getStreamingLinks(songName, artistName);
      setLinks(streamingLinks);
    } catch (error) {
      console.error('Error fetching streaming links:', error);
    }
  };

  return (
    <div className="audio-recorder-container">
      <h2 className="recorder-title">Audio Recorder</h2>
      <div className="recorder-buttons">
        <button onClick={startRecording} disabled={isRecording} className="action-button start-button">
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording} className="action-button stop-button">
          Stop Recording
        </button>
      </div>

      {audioURL && (
        <div className="playback-section">
          <h4 className="playback-title">Playback:</h4>
          <audio src={audioURL} controls className="audio-player" />
          <button onClick={handleSongRecognition} className="action-button recognize-button">
            Recognize Song
          </button>
        </div>
      )}

      {songName && <SongDetails songName={songName} artistName={artistName} />}

      {songName && (
        <div className="actions-section">
          <button onClick={handleGetLyrics} className="action-button lyrics-button">Get Lyrics</button>
          <button onClick={handleGetLinks} className="action-button links-button">Get Links</button>
        </div>
      )}

      {lyricsLink && (
        <div className="lyrics-section">
          <h4 className="lyrics-title">Lyrics:</h4>
          <div className="lyrics-content" dangerouslySetInnerHTML={{ __html: lyricsLink }} />
        </div>
      )}

      {links.length > 0 && (
        <div className="links-section">
          <h4 className="links-title">Streaming Links:</h4>
          <ul className="links-list">
            {links.map ((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;