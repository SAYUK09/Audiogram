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
import {LINE_HEIGHT, PaginatedSubtitles} from "./Subtitles";

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
  backgroundColor: string;
  textColor: string;
  titleColor: string;
}> = ({
  source,
  audioOffsetInFrames,
  backgroundColor,
  textColor,
  titleColor,
}) => {
  const {durationInFrames} = useVideoConfig();

  const [handle] = useState(() => delayRender());
  const [subtitles, setSubtitles] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  console.log(backgroundColor);
  const {audiogramDetails} = useAudiogram();

  useEffect(() => {
    fetch(source)
      .then((res) => res.text())
      .then((text) => {
        setSubtitles(text);
        continueRender(handle);

        console.log(text, "textetete");
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
          <Audio src={audiogramDetails.audio} />

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
                src={audiogramDetails.cover}
                width={500}
                alt="cover image"
              />

              <div style={{color: titleColor}} className="title">
                {audiogramDetails.title}
              </div>
            </div>

            <div>
              <AudioViz />
            </div>

            <div
              style={{lineHeight: `${LINE_HEIGHT}px`, color: textColor}}
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
