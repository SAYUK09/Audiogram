import { useAudiogram } from "@/contexts/audiogramContext";
import { AudiogramComposition } from "@/remotion/Composition";
import { exportVideo } from "@/services/export";
import { Player } from "@remotion/player";
import React, { useEffect, useRef, useState } from "react";
import {
  ColorPicker,
  Text,
  Stack,
  Flex,
  Group,
  Box,
  TextInput,
  Button,
  Loader,
} from "@mantine/core";
import getAudioDuration from "@/utility/getAudioDuration";

function Design() {
  const { audiogramDetails, setAudiogramDetails } = useAudiogram();
  const fps = 30;

  const [downloadURL, setDownloadURL] = useState<string>("");
  const [downloadMsg, setDownloadMsg] = useState<string>("");
  const [disableDownload, setDisableDownload] = useState<boolean>(false);

  const [duration, setDuration] = useState<number>(1);

  useEffect(() => {
    const fetchAudioDuration = async () => {
      const audioDuration = await getAudioDuration(audiogramDetails.audio);
      if (audioDuration !== null) {
        setDuration(Math.round(audioDuration * fps));
      }
    };

    fetchAudioDuration();
  }, [audiogramDetails.audio]);

  const regexPattern = /(?<=srt\/).*?(?=.srt)/;
  const srtFileName = audiogramDetails.srtFile.match(regexPattern);

  async function handleExport() {
    setDisableDownload(true);
    setDownloadMsg("Sit tight, your audiogram is on your way!");
    const { data } = await exportVideo({
      inputProps: {
        backgroundColor: audiogramDetails.designProps.backgroundColor,
        textColor: audiogramDetails.designProps.textColor,
        titleColor: audiogramDetails.designProps.titleColor,
        audio: audiogramDetails.audio,
        source: audiogramDetails.srtFile,
        title: audiogramDetails.title,
        cover: audiogramDetails.cover,
        audioOffsetInFrames: 0,
      },
      width: audiogramDetails.orientation.compositionWidth,
      height: audiogramDetails.orientation.compositionHeight,
      fileName: (srtFileName && srtFileName[0]) || "Audiogram",
    });

    console.log(data, "data");
    setDownloadURL(data);
    data && setDisableDownload(false);
    data && setDownloadMsg("");
  }

  return (
    <Flex mih={"100vh"} direction="column" justify={"space-evenly"}>
      <Flex
        p={32}
        gap="xl"
        justify="space-around"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Stack align="start" justify="space-around" spacing="lg">
          <Box className="flex flex-col justify-center items-start w-full">
            <TextInput
              placeholder="Enter Title"
              label="Title"
              variant="filled"
              radius="md"
              size="lg"
              onChange={(e) => {
                setAudiogramDetails({
                  ...audiogramDetails,
                  title: e.target.value,
                });
              }}
            />
          </Box>

          <Stack>
            <Group spacing="sm">
              <Stack>
                <Text fz={"xl"}>Background Color</Text>

                <Box className="mt-4">
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
                </Box>
              </Stack>
              <Stack>
                <Box>
                  <Text fz={"xl"}>Title Color</Text>
                </Box>

                <Box className="mt-10">
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
                    value={audiogramDetails.designProps.titleColor}
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
                </Box>
              </Stack>
              <Stack>
                <Box>
                  <Text fz={"xl"}>Subtitles Color</Text>
                </Box>

                <Box className="mt-10">
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
                    value={audiogramDetails.designProps.textColor}
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
                </Box>
              </Stack>
            </Group>
          </Stack>
        </Stack>
        <Stack>
          {audiogramDetails.audio && audiogramDetails.srtFile && (
            <Player
              component={AudiogramComposition}
              durationInFrames={duration}
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
                srtFile: audiogramDetails.srtFile,
                audio: audiogramDetails.audio,
                backgroundColor: audiogramDetails.designProps.backgroundColor,
                textColor: audiogramDetails.designProps.textColor,
                titleColor: audiogramDetails.designProps.titleColor,
                cover: audiogramDetails.cover,
                title: audiogramDetails.title,
              }}
            />
          )}
        </Stack>
      </Flex>

      <Flex direction="column" align={"center"}>
        <Button disabled={disableDownload} onClick={handleExport}>
          Download Video
        </Button>

        <Flex p={8} align="center">
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "white", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            ta="center"
            fz="xl"
            fw={700}
          >
            {downloadMsg}
          </Text>
          <Box mx={8}>
            {downloadMsg.length ? <Loader variant="bars" /> : ""}
          </Box>
        </Flex>

        <Box>
          {downloadURL && (
            <Button
              compact
              variant="sublte"
              size="lg"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={downloadURL}
            >
              <Text underline>Take me to the audiogram</Text>
            </Button>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default Design;
