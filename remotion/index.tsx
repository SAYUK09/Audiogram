import {AudiogramProvider, useAudiogram} from "../contexts/audiogramContext";
import {Composition, registerRoot} from "remotion";
import {AudiogramComposition} from "./Composition";
import "./style.css";

export const RenderComposition = () => {
  const {audiogramDetails} = useAudiogram();
  return (
    <>
      <Composition
        id="Audiogram"
        component={AudiogramComposition}
        durationInFrames={600}
        fps={30}
        width={audiogramDetails.orientation.compositionWidth}
        height={audiogramDetails.orientation.compositionHeight}
        defaultProps={{
          audioOffsetInFrames: 0,
          srtFile: audiogramDetails.srtFile,
          audio: audiogramDetails.audio,
          backgroundColor: audiogramDetails.designProps.backgroundColor,
          textColor: audiogramDetails.designProps.textColor,
          titleColor: audiogramDetails.designProps.titleColor,
          cover: audiogramDetails.cover,
          title: audiogramDetails.title,
        }}
      />
    </>
  );
};

export const RemotionVideo = () => {
  return (
    <>
      <AudiogramProvider>
        <RenderComposition />
      </AudiogramProvider>
    </>
  );
};

registerRoot(RemotionVideo);
