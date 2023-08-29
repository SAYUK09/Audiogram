import Head from "next/head";
import { useAudiogram } from "@/contexts/audiogramContext";
import axios from "axios";
import Link from "next/link";
import FileUpload from "@/components/FileDropzoneUpload";
import { FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { transcribeAudio } from "@/services/transcription";
import { Box, Button, Flex, Loader, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Home() {
  const [loader, setLoader] = useState<boolean>(false);
  const { audiogramDetails, setAudiogramDetails } = useAudiogram();

  const acceptedFileTypes = ".mp3";

  useEffect(() => {
    audiogramDetails.srtFile.length && audiogramDetails.cover.length
      ? setLoader(true)
      : setLoader(false);

    return () => setLoader(false);
  }, [audiogramDetails.srtFile, audiogramDetails.cover]);

  const uploadImage = async (files: FileWithPath[]) => {
    setLoader(true);
    const formData = new FormData();

    if (files[0]) {
      formData.append("file", files[0]);
      formData.append("upload_preset", "audiogramImages");
    }

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/sayuk/image/upload",
        formData
      );

      setAudiogramDetails({ ...audiogramDetails, cover: res.data.secure_url });
    } catch (err) {
      console.error(err);
    }
  };

  const uploadAudio = async (files: FileWithPath[]) => {
    setLoader(true);
    try {
      if (!files[0]) {
        throw new Error("Please select a file.");
      }

      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "audiogramAudio");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/sayuk/upload",
        formData
      );
      const { secure_url: audioUrl } = data;

      // Calling Transcription Service
      const srtUrl = await transcribeAudio(data.secure_url);

      audioUrl &&
        srtUrl &&
        setAudiogramDetails({
          ...audiogramDetails,
          audio: audioUrl,
          srtFile: srtUrl,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex
          h={"100vh"}
          gap="xl"
          justify="space-between"
          align="stretch"
          direction="column"
          wrap="wrap"
          p={32}
        >
          <Stack>
            <Box>
              <FileUpload
                onDrop={uploadAudio}
                msg={"Drag or Click to upload Audio Files "}
                accept={[acceptedFileTypes]}
              />
            </Box>

            <Box>
              <FileUpload
                msg={"Drag or Click to Upload Image Files"}
                onDrop={uploadImage}
                accept={IMAGE_MIME_TYPE}
              />
            </Box>
          </Stack>

          <Flex justify={"space-between"}>
            {loader ? (
              <Flex p={8} align="center">
                <Text
                  variant="gradient"
                  gradient={{ from: "indigo", to: "white", deg: 45 }}
                  sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                  ta="center"
                  fz="xl"
                  fw={700}
                >
                  Sit Tight! While we are generating a transcript for your
                  audiogram
                </Text>
                <Box mx={8}>
                  <Loader variant="bars" />
                </Box>
              </Flex>
            ) : (
              <></>
            )}

            <Button size="md" disabled={!loader}>
              <Link href={"./frame"} style={{ textDecoration: "none" }}>
                <Box>Next</Box>
              </Link>
            </Button>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
