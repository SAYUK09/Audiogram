import {IAudiogramDetails} from "@/types/audiogram";
import React, {createContext, useState, useContext} from "react";

export interface IAudiogramContext {
  audiogramDetails: IAudiogramDetails;
  setAudiogramDetails: React.Dispatch<React.SetStateAction<IAudiogramDetails>>;
}

export const orientationType = {
  square: {
    orientation: "Square",
    compositionWidth: 1080,
    compositionHeight: 1080,
    width: 500,
    height: 500,
  },

  landscape: {
    orientation: "Landscape",
    compositionWidth: 1920,
    compositionHeight: 1080,
    width: 540,
    height: 300,
  },

  portrait: {
    orientation: "Portrait",
    compositionWidth: 1080,
    compositionHeight: 1920,
    width: 300,
    height: 540,
  },
};

const AudigramContext = createContext<IAudiogramContext | null>(null);

export const AudiogramProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [audiogramDetails, setAudiogramDetails] = useState({
    title: "Blah",
    cover:
      "https://res.cloudinary.com/sayuk/image/upload/v1679044251/audiogram/images/Dalle_fbfxge.png",
    audio:
      "https://res.cloudinary.com/sayuk/video/upload/v1679044168/audiogram/audio/clip_jgghuy.mp3",
    srtFile:
      "https://res.cloudinary.com/sayuk/raw/upload/v1679130523/audiogram/srt/jjazegz2oxj0zyolbcla.srt",
    orientation: orientationType.landscape,
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
