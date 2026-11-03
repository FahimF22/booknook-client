import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export interface Slide {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}

export const slides: Slide[] = [
  {
    eyebrow: "Welcome to BookNook",
    title: "Your neighborhood library, now online",
    text: "Discover novels, science reads and children's favorites shared by readers in your community.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=75",
  },
  {
    eyebrow: "Borrow in one click",
    title: "Pick a book, borrow it for 7 days",
    text: "Find a title you like, confirm your borrow, and return it when you're done. No fees, no fuss.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=75",
  },
  {
    eyebrow: "Share your shelf",
    title: "Give your finished books a second life",
    text: "Add the books you've already read so another reader can enjoy them next.",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1920&q=75",
  },
];

export const sliderHeight = "h-[480px] sm:h-[540px] lg:h-[600px]";

export default function HeroSlide({ slide, first = false }: { slide: Slide; first?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={slide.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        fetchPriority={first ? "high" : "auto"}
        loading={first ? "eager" : "lazy"}
      />
      {/* Green overlay keeps the text readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(20%_0.04_160/0.92)] via-[oklch(22%_0.04_160/0.7)] to-[oklch(22%_0.04_160/0.25)]" />
      <div className="page-container relative flex h-full items-center">
        <div className="max-w-xl text-[oklch(97%_0.01_85)]">
          <span className="badge badge-accent badge-lg font-medium">{slide.eyebrow}</span>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {slide.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[oklch(97%_0.01_85/0.85)]">{slide.text}</p>
          <Link href="/books" className="btn btn-accent btn-lg mt-8">
            Browse Books <LuArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
