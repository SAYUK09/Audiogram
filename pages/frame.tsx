import {orientationType, useAudiogram} from "@/contexts/audiogramContext";
import {AudiogramComposition} from "@/remotion/Composition";
import {Player} from "@remotion/player";
import React from "react";

function frame() {
  const {audiogramDetails, setAudiogramDetails} = useAudiogram();
  const fps = 30;
  const durationInFrames = 30 * fps;

  const clickHandler = (value: keyof typeof orientationType) => {
    const val = value;

    setAudiogramDetails((prev) => ({
      ...prev,
      orientation: orientationType[val],
    }));
  };

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <p className="text-[#1E272ECF] font-semibold text-2xl">
            Select Frame
          </p>
        </div>

        <div className="flex flex-col">
          <div className="w-full">
            <button
              className="flex py-4 justify-around w-full"
              onClick={() => clickHandler("landscape")}
            >
              <p className="text-base font-semibold">Landscape</p>

              {/* <img src={} alt="" /> */}
            </button>
          </div>

          <div className="w-full">
            <button
              className="flex py-4 justify-around w-full"
              onClick={() => clickHandler("square")}
            >
              <p className="text-base text-left font-semibold">Sqaure</p>

              {/* <img src={} alt="" /> */}
            </button>
          </div>

          <div className="w-full">
            <button
              className="flex py-4 justify-around w-full"
              onClick={() => clickHandler("portrait")}
            >
              <p className="text-base font-semibold">Portrait</p>

              {/* <img src={} alt="" /> */}
            </button>
          </div>
        </div>
      </div>
      {audiogramDetails.audio && audiogramDetails.srtFile && (
        <Player
          component={AudiogramComposition}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={audiogramDetails.orientation.compositionWidth}
          compositionHeight={audiogramDetails.orientation.compositionHeight}
          style={{
            width: audiogramDetails.orientation.width,
            height: audiogramDetails.orientation.height,
          }}
          controls
          inputProps={{
            audioOffsetInFrames: 0,
            source: audiogramDetails.srtFile,
            backgroundColor: audiogramDetails.designProps.backgroundColor,
            textColor: audiogramDetails.designProps.textColor,
            titleColor: audiogramDetails.designProps.titleColor,
          }}
        />
      )}
    </div>
  );
}

export default frame;
