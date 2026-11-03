import { Suspense } from "react";
import HeroSlide, { sliderHeight, slides } from "./HeroSlide";
import HeroSlider from "./HeroSlider";

// Swiper's autoplay reads the clock, so it runs in the browser.
// Until then the first slide shows as a static placeholder, so nothing jumps.
export default function HeroBanner() {
  return (
    <section aria-label="Featured" className="hero-slider relative">
      <Suspense
        fallback={
          <div className={sliderHeight}>
            <HeroSlide slide={slides[0]} first />
          </div>
        }
      >
        <HeroSlider />
      </Suspense>
    </section>
  );
}
