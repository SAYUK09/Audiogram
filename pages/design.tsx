import {useAudiogram} from "@/contexts/audiogramContext";
import {AudiogramComposition} from "@/remotion/Composition";
import {Player} from "@remotion/player";
import React from "react";

function design() {
  const {audiogramDetails} = useAudiogram();

  const fps = 30;
  const durationInFrames = 30 * fps;
  return (
    <div>
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
          backgroundColor: audiogramDetails.backgroundColor,
          textColor: audiogramDetails.textColor,
          titleColor: audiogramDetails.titleColor,
        }}
      />
    </div>
  );
}

export default design;
