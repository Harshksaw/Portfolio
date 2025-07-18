"use client";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import FullpageProvider from "@/components/fullpageProvider";
import { HeaderNavigation } from "@/components/headerNavigation";

import "./index.css";
import Hero from "@/components/Hero";

export default function HomePage({}) {
  return (
    <>
      <Cursor />
      {/* <Intro /> */}

      <HeaderNavigation />
      <FullpageProvider>
        <Main />
      </FullpageProvider>
    </>
  );
}
