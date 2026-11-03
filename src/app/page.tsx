import HeroBanner from "@/components/home/HeroBanner";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </>
  );
}
