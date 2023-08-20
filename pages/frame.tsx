import { orientationType, useAudiogram } from "@/contexts/audiogramContext";
import { AudiogramComposition } from "@/remotion/Composition";
import { Player } from "@remotion/player";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IconRectangle,
  IconRectangleVertical,
  IconSquare,
} from "@tabler/icons-react";
import { Box, Button, Flex, Group, Stack, Text } from "@mantine/core";
import getAudioDuration from "@/utility/getAudioDuration";

function Frame() {
  const { audiogramDetails, setAudiogramDetails } = useAudiogram();
  const fps = 30;
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

  const clickHandler = (value: keyof typeof orientationType) => {
    const val = value;

    setAudiogramDetails((prev) => ({
      ...prev,
      orientation: orientationType[val],
    }));
  };

  return (
    <Flex direction={"column"} mih={"100vh"} p={32}>
      <Flex
        gap="xl"
        justify="space-around"
        align="center"
        direction="row"
        wrap="wrap"
        style={{ flexGrow: 1 }}
      >
        <Stack>
          <Text fz={"xl"}>Select Frame</Text>

          <Group className="flex flex-col">
            <Box>
              <Button
                onClick={() => clickHandler("landscape")}
                leftIcon={<IconRectangle />}
                variant="white"
              >
                Landscape
              </Button>
            </Box>

            <Box>
              <Button
                onClick={() => clickHandler("square")}
                leftIcon={<IconSquare />}
                variant="white"
              >
                Square
              </Button>
            </Box>

            <Box>
              <Button
                onClick={() => clickHandler("portrait")}
                leftIcon={<IconRectangleVertical />}
                variant="white"
              >
                Portrait
              </Button>
            </Box>
          </Group>
        </Stack>

        <Stack w={"50%"} align="center">
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
      <Stack>
        <Link href={"./design"} style={{ alignSelf: "end" }}>
          <Button
            size="md"
            disabled={
              audiogramDetails.srtFile.length && audiogramDetails.cover.length
                ? false
                : true
            }
          >
            Next
          </Button>
        </Link>
      </Stack>
    </Flex>
  );
}

export default Frame;
