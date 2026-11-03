import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";

// The layout's "BookNook | %s" pattern does not apply to the page in the same folder
export const metadata: Metadata = { title: { absolute: "BookNook | Home" } };

export default function Home() {
  return (
    <>
      <h1 className="sr-only">BookNook – A Small Online Library</h1>
      <HeroBanner />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </>
  );
}
