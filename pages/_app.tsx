import {AudiogramProvider} from "@/contexts/audiogramContext";
import "@/styles/globals.css";
import "../remotion/style.css";
import type {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {
  return (
    <AudiogramProvider>
      <Component {...pageProps} />
    </AudiogramProvider>
  );
}
