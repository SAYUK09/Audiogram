import axios from 'axios';

const getAudioDuration = async (audioUrl: string): Promise<number | null> => {
  try {
    const response = await axios.head(audioUrl);
    const contentLength = response.headers['content-length'];
    const audio = new Audio(audioUrl);

    // Wait for the audio metadata to load
    return new Promise((resolve) => {
      audio.addEventListener('loadedmetadata', () => {
        const audioDuration = audio.duration;
        resolve(audioDuration);
      });

      // Preload the audio to get the metadata (duration)
      audio.preload = 'metadata';
      audio.load();
    });
  } catch (error) {
    console.error('Error fetching audio duration:', error);
    return null;
  }
};

export default getAudioDuration;
