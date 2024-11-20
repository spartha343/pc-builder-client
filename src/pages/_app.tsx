import { ICategory } from "@/interfaces/category.interface";
import "@/styles/globals.css";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    page: ReactElement,
    props: { categories: ICategory[] }
  ) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </SessionProvider>
  );
}
