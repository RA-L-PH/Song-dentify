// SERVICES/audioRecognition.js
import axios from 'axios';

const recognizeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append('file', audioBlob);

  const options = {
    method: 'POST',
    url: 'https://shazam-song-recognition-api.p.rapidapi.com/recognize/file',
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST || 'shazam-song-recognition-api.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
    },
    data: formData,
  };

  try {
    console.log('Sending request with audioBlob:', audioBlob); // Log the audio blob
    const response = await axios.request(options);
    console.log('API Response:', response.data); // Log full API response

    const track = response.data?.track;
    if (track && track.title) {
      return {
        title: track.title,
        artist: track.subtitle || 'Unknown Artist',
      };
    } else {
      console.log('No track data found in response');
      return null;
    }
  } catch (error) {
    console.error('Error in recognizeAudio:', error);
    throw error;
  }
};

export { recognizeAudio };
