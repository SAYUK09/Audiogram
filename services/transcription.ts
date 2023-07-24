import axios from "axios";

type TranscriptionRequest = {
  audio_url: string;
};

export async function transcribeAudio(audioUrl: string): Promise<string> {
  const request: TranscriptionRequest = {audio_url: audioUrl};
  try {
    const response = await axios.post(
      "http://localhost:8000/transcribe",
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to transcribe audio");
  }
}
