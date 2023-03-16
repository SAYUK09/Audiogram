import {useAudiogram} from "@/contexts/audiogramContext";
import axios from "axios";
import React, {useState} from "react";

function ImageUploader() {
  const [file, setFile] = useState<null | File>(null);

  const {audiogramDetails, setAudiogramDetails} = useAudiogram();

  const uploadImage = async () => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
      formData.append("upload_preset", "audiogramImages");
    }

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/sayuk/image/upload",
        formData
      );
      setAudiogramDetails({...audiogramDetails, cover: res.data.secure_url});
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFile(event.target.files![0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default ImageUploader;
