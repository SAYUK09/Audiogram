import {useAudiogram} from "@/contexts/audiogramContext";
import {transcribeAudio} from "@/services/transcription";
import axios from "axios";
import React, {useState} from "react";

function AudioUploader() {
  const {audiogramDetails, setAudiogramDetails} = useAudiogram();

  const [file, setFile] = useState<File | null>(null);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        throw new Error("Please select a file.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "audiogramAudio");

      const {data} = await axios.post(
        "https://api.cloudinary.com/v1_1/sayuk/upload",
        formData
      );
      const {secure_url: audioUrl} = data;

      // Calling Transcription Service
      const srtUrl = await transcribeAudio(data.secure_url);

      audioUrl &&
        srtUrl &&
        setAudiogramDetails({
          ...audiogramDetails,
          audio: audioUrl,
          srtFile: srtUrl,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileInputChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default AudioUploader;
