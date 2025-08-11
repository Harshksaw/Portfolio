"use client";

import Image from "next/image";

function AvatarTest() {
  return (
    <div className="relative w-[400px] h-[400px]">
      <Image
        src="/img/me.png"
        alt="Avatar Test"
        fill
        className="object-contain"
      />
    </div>
  );
}

export default function TestPage() {
  return (
    <div className="w-full h-screen bg-black">
      <h1 className="text-white text-center py-4 text-2xl">Avatar Test</h1>
      
      <div className="w-full h-[80vh] flex items-center justify-center">
        <AvatarTest />
      </div>
    </div>
  );
}