import {useAudiogram} from "@/contexts/audiogramContext";
import {AudiogramComposition} from "@/remotion/Composition";
import {exportVideo, getDownloadUrlAndProgress} from "@/services/export";
import {Player} from "@remotion/player";
import React, {useRef, useState} from "react";
import {ColorPicker, Text, Stack} from "@mantine/core";

function Design() {
  const {audiogramDetails, setAudiogramDetails} = useAudiogram();
  const titleInput = useRef<HTMLInputElement | null>(null);

  const [downloadURL, setDownloadURL] = useState<string>("");

  async function handleExport() {
    const {data} = await exportVideo({
      inputProps: {
        backgroundColor: audiogramDetails.designProps.backgroundColor,
        textColor: audiogramDetails.designProps.textColor,
        audio: audiogramDetails.audio,
        source: audiogramDetails.srtFile,
        title: audiogramDetails.title,
        cover: audiogramDetails.cover,
        audioOffsetInFrames: 0,
      },
      width: audiogramDetails.orientation.compositionWidth,
      height: audiogramDetails.orientation.compositionHeight,
    });

    if (data.bucketName && data.renderId) {
      getDownloadURL(data);
    }
  }

  async function getDownloadURL(body: any) {
    const inputBody = body;

    setDownloadURL("loading");
    const {
      data: {data},
    } = await getDownloadUrlAndProgress(body);

    if (!data.done) {
      setTimeout(() => {
        getDownloadURL(inputBody);
      }, 8000);
    } else {
      setDownloadURL(data.url);
    }
  }

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
      <Stack>
        <Text fz={"xl"}>Background Color</Text>

        <div className="mt-4">
          <ColorPicker
            format="hex"
            swatchesPerRow={7}
            swatches={[
              "#25262b",
              "#868e96",
              "#FFFFFF",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
            value={audiogramDetails.designProps.backgroundColor}
            onChange={(color) => {
              setAudiogramDetails({
                ...audiogramDetails,
                designProps: {
                  ...audiogramDetails.designProps,
                  backgroundColor: color,
                },
              });
            }}
          />
        </div>
      </Stack>
      <Stack>
        <div>
          <Text fz={"xl"}>Text Color</Text>
        </div>

        <div className="mt-10">
          <ColorPicker
            format="hex"
            swatchesPerRow={7}
            swatches={[
              "#25262b",
              "#868e96",
              "#FFFFFF",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
            value={audiogramDetails.designProps.backgroundColor}
            onChange={(color) => {
              setAudiogramDetails({
                ...audiogramDetails,
                designProps: {
                  ...audiogramDetails.designProps,
                  titleColor: color,
                },
              });
            }}
          />
        </div>
      </Stack>
      <Stack>
        <div>
          <Text fz={"xl"}>Subtitles Color</Text>
        </div>

        <div className="mt-10">
          <ColorPicker
            format="hex"
            swatchesPerRow={7}
            swatches={[
              "#25262b",
              "#868e96",
              "#FFFFFF",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
            value={audiogramDetails.designProps.backgroundColor}
            onChange={(color) => {
              setAudiogramDetails({
                ...audiogramDetails,
                designProps: {
                  ...audiogramDetails.designProps,
                  textColor: color,
                },
              });
            }}
          />
        </div>
      </Stack>
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
      <button onClick={handleExport}>Download Video</button>
      URL: {downloadURL}
    </div>
  );
}

export default Design;
