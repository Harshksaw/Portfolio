import React, { useRef } from "react";

import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";

import Avatar3D from "../Avatar3d";
import { ModalWrapper } from "./modalWrapper";

export function HeroSection({}) {
  const sectionRef = useRef(null);
  return (
    <section
      ref={sectionRef}
      className="section section__1 darkGradient first relative z-0 px-paddingX text-colorLight bg-red-400"
    >
      <Bulge type="Light" />
      <Header color="Light" />
      <HeroWrapper />

      <Avatar3D/>
    </section>
  );
}
