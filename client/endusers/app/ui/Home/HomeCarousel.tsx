"use client";

import { ThemeProvider } from "@material-tailwind/react";
import CarouselH from "./Carousel";

export default function HomeCarousel() {
  return (
    <section className="absolute top-0 z-0">
      <ThemeProvider>
        <CarouselH />
      </ThemeProvider>
    </section>
  );
}
