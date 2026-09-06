"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function HeroLottie() {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
      <DotLottieReact
        src="/STUDENT.lottie"
        loop
        autoplay
        className="aspect-square w-full max-h-[420px]"
      />
    </div>
  );
}
