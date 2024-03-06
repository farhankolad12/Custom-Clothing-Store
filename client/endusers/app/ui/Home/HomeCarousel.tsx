"use client";

import { ThemeProvider } from "@material-tailwind/react";
import CarouselH from "./Carousel";

export default function HomeCarousel() {
  return (
    <section className="w-full">
      <ThemeProvider>
        <CarouselH />
      </ThemeProvider>
    </section>
  );
}
