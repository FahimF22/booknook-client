"use client";

import { useSyncExternalStore } from "react";
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroSlide, { sliderHeight, slides } from "./HeroSlide";

const subscribe = () => () => {};

export default function HeroSlider() {
  // Swiper reads the clock while rendering, which Next.js blocks on the server.
  // So the server sends the first slide as a still image, and the browser swaps in the slider.
  const inBrowser = useSyncExternalStore(subscribe, () => true, () => false);

  if (!inBrowser) {
    return (
      <div className={sliderHeight}>
        <HeroSlide slide={slides[0]} first />
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop
      speed={900}
      autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      navigation
      pagination={{ clickable: true }}
      className={sliderHeight}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={slide.title}>
          <HeroSlide slide={slide} first={i === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
