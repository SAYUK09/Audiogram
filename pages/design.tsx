import {useAudiogram} from "@/contexts/audiogramContext";
import {AudiogramComposition} from "@/remotion/Composition";
import {Player} from "@remotion/player";
import React, {useRef} from "react";
import {BlockPicker} from "react-color";

function design() {
  const {audiogramDetails, setAudiogramDetails} = useAudiogram();
  const titleInput = useRef<HTMLInputElement | null>(null);

  const fps = 30;
  const durationInFrames = 30 * fps;
  return (
    <div>
      <div className="flex flex-col justify-center items-start w-full">
        <p className="text-[#575E63] font-semibold text-sm">Title</p>
        <input
          placeholder="title goes here"
          ref={titleInput}
          className="bg-gray-300 border-none rounded-sm"
          type="text"
          onChange={(e) => {
            setAudiogramDetails({
              ...audiogramDetails,
              title: e.target.value,
            });
          }}
        />
      </div>

      <div className="flex w-full justify-center items-center flex-col my-3 ">
        <div>
          <h3>Background Color</h3>
        </div>

        <div className="mt-4">
          <BlockPicker
            color={audiogramDetails.designProps.backgroundColor}
            onChange={(color) => {
              setAudiogramDetails({
                ...audiogramDetails,
                designProps: {
                  ...audiogramDetails.designProps,
                  backgroundColor: color.hex,
                },
              });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col my-3 ">
        <div>
          <h3>Text Color</h3>
        </div>

        <div className="mt-10">
          <BlockPicker
            color={audiogramDetails.designProps.titleColor}
            onChange={(color) => {
              setAudiogramDetails({
                ...audiogramDetails,
                designProps: {
                  ...audiogramDetails.designProps,
                  titleColor: color.hex,
                },
              });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col my-3 ">
        <div>
          <h3>Subtitles Color</h3>
        </div>

        <div className="mt-10">
          <BlockPicker
            color={audiogramDetails.designProps.textColor}
            onChange={(color) => {
              setAudiogramDetails({
                ...audiogramDetails,
                designProps: {
                  ...audiogramDetails.designProps,
                  textColor: color.hex,
                },
              });
            }}
          />
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

export default design;
