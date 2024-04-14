import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpcConfigFe } from "@/utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default (trpcConfigFe as any).withTRPC(App);
