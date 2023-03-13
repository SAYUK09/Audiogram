import {useAudiogram} from "@/contexts/audiogramContext";
import {useAudioData, visualizeAudio} from "@remotion/media-utils";
import React, {useEffect, useRef, useState} from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
// import audioSource from "../public/audio.mp3";
// import audiosource from "/audio.mp3";
import coverImg from "./assets/cover.jpg";
import CoverImg from "../public/next.svg";
import {LINE_HEIGHT, PaginatedSubtitles} from "./Subtitles";
import Image from "next/image";
import Pic from "../public/vercel.svg";

const AudioViz = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const audioData = useAudioData(
    "https://res.cloudinary.com/sayuk/video/upload/v1676829207/audiogram/audio/wd4qh1kkdrveighmgaka.mp3"
  );

  if (!audioData) {
    return null;
  }

  const allVisualizationValues = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 256, // Use more samples to get a nicer visualisation
  });

  // Pick the low values because they look nicer than high values
  // feel free to play around :)
  const visualization = allVisualizationValues.slice(8, 30);

  const mirrored = [...visualization.slice(1).reverse(), ...visualization];

  return (
    <div className="audio-viz">
      {mirrored.map((v, i) => {
        return (
          <div
            key={i}
            className="bar"
            style={{
              height: `${500 * Math.sqrt(v)}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export const AudiogramComposition: React.FC<{
  source: string;
  audioOffsetInFrames: number;
}> = ({source, audioOffsetInFrames}) => {
  const {durationInFrames} = useVideoConfig();

  const [handle] = useState(() => delayRender());
  const [subtitles, setSubtitles] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const {audiogramDetails} = useAudiogram();

  useEffect(() => {
    fetch(source)
      .then((res) => res.text())
      .then((text) => {
        setSubtitles(text);
        console.log(text, "ttttt");
        continueRender(handle);
      })
      .catch((err) => {
        console.log("Error fetching subtitles", err);
      });
  }, [handle, source]);

  if (!subtitles) {
    return null;
  }

  return (
    <div ref={ref}>
      <AbsoluteFill>
        <Sequence from={-audioOffsetInFrames}>
          <Audio
            src={
              "https://res.cloudinary.com/sayuk/video/upload/v1676829207/audiogram/audio/wd4qh1kkdrveighmgaka.mp3"
            }
          />

          <div
            className="container"
            style={{
              fontFamily: "IBM Plex Sans",
            }}
          >
            <div className="row">
              <Img
                className="cover"
                src={
                  "https://res.cloudinary.com/sayuk/image/upload/v1676829207/audiogram/images/bakeh2b3y4fbx27l8uqw.jpg"
                }
                width={500}
                alt="ddd"
              />

              <div className="title">
                #234 – Money, Kids, and Choosing Your Market with Justin Jackson
                of Transistor.fm
              </div>
            </div>

            <div>
              <AudioViz />
            </div>

            <div style={{lineHeight: `${LINE_HEIGHT}px`}} className="captions">
              <PaginatedSubtitles
                subtitles={subtitles}
                startFrame={audioOffsetInFrames}
                endFrame={audioOffsetInFrames + durationInFrames}
                linesPerPage={4}
              />
            </div>
          </div>
        </Sequence>
      </AbsoluteFill>
    </div>
  );
};

// https://res.cloudinary.com/sayuk/video/upload/v1676829207/audiogram/audio/wd4qh1kkdrveighmgaka.mp3
