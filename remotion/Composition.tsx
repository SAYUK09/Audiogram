import { useAudiogram } from "../contexts/audiogramContext";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import React, { useEffect, useRef, useState } from "react";
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
import { LINE_HEIGHT, PaginatedSubtitles } from "./Subtitles";

const AudioViz = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { audiogramDetails } = useAudiogram();
  const audioData = useAudioData(audiogramDetails.audio);

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
  srtFile: string;
  audioOffsetInFrames: number;
  backgroundColor: string;
  textColor: string;
  titleColor: string;
  cover: string;
  title: string;
  audio: string;
}> = ({
  srtFile,
  audioOffsetInFrames,
  backgroundColor,
  textColor,
  titleColor,
  cover,
  title,
  audio,
}) => {
  const { durationInFrames } = useVideoConfig();

  const [handle] = useState(() => delayRender());
  const [subtitles, setSubtitles] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(srtFile)
      .then((res) => res.text())
      .then((text) => {
        setSubtitles(text);
        continueRender(handle);

        console.log(text, "textetete");
      })
      .catch((err) => {
        console.log("Error fetching subtitles", err);
      });
  }, [handle, srtFile]);

  if (!subtitles) {
    return null;
  }

  return (
    <div ref={ref}>
      <AbsoluteFill>
        <Sequence from={-audioOffsetInFrames}>
          <Audio src={audio} />

          <div
            className="container"
            style={{
              fontFamily: "IBM Plex Sans",
              backgroundColor: backgroundColor,
            }}
          >
            <div className="row">
              <Img
                className="cover"
                src={cover}
                height={500}
                width={500}
                alt="cover image"
              />

              <div style={{ color: titleColor }} className="title">
                {title}
              </div>
            </div>

            <div>
              <AudioViz />
            </div>

            <div
              style={{ lineHeight: `${LINE_HEIGHT}px`, color: textColor }}
              className="captions"
            >
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
