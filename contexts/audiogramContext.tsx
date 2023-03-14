import {IAudiogramDetails} from "@/types/audiogram";
import React, {createContext, useState, useContext} from "react";

export interface IAudiogramContext {
  audiogramDetails: IAudiogramDetails;
  setAudiogramDetails: React.Dispatch<React.SetStateAction<IAudiogramDetails>>;
}

const AudigramContext = createContext<IAudiogramContext | null>(null);

export const AudiogramProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [audiogramDetails, setAudiogramDetails] = useState({
    title: "Blah",
    cover:
      "https://res.cloudinary.com/sayuk/image/upload/v1676829207/audiogram/images/bakeh2b3y4fbx27l8uqw.jpg",
    audio:
      "https://res.cloudinary.com/sayuk/video/upload/v1676829207/audiogram/audio/wd4qh1kkdrveighmgaka.mp3",
    srtFile:
      "https://res.cloudinary.com/sayuk/raw/upload/v1676829206/audiogram/srt/hbskfawyc9flxhzpfw69.srt",
  });

  return (
    <AudigramContext.Provider value={{audiogramDetails, setAudiogramDetails}}>
      {children}
    </AudigramContext.Provider>
  );
};

export function useAudiogram(): IAudiogramContext {
  return useContext(AudigramContext) as IAudiogramContext;
}
