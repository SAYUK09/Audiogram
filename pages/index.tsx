import Head from "next/head";

import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.css";
import {Player} from "@remotion/player";
import {useAudiogram} from "@/contexts/audiogramContext";
import {AudiogramComposition} from "@/remotion/Composition";
import {useState} from "react";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const fps = 30;
  const durationInFrames = 30 * fps;

  const {audiogramDetails} = useAudiogram();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <ImageUploader />
          </div>

          <Player
            component={AudiogramComposition}
            durationInFrames={durationInFrames}
            fps={fps}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{
              width: 1280,
              height: 720,
            }}
            controls
            inputProps={{
              audioOffsetInFrames: 0,
              source: audiogramDetails.srtFile,
            }}
          />
        </div>
      </main>
    </>
  );
}
