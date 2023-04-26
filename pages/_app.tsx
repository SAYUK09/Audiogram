import {AudiogramProvider} from "@/contexts/audiogramContext";
import "@/styles/globals.css";
import "../remotion/style.css";
import type {AppProps} from "next/app";
import {MantineProvider} from "@mantine/core";
import Head from "next/head";

export default function App(props: AppProps) {
  const {Component, pageProps} = props;
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <AudiogramProvider>
          <Component {...pageProps} />
        </AudiogramProvider>
      </MantineProvider>
    </>
  );
}
