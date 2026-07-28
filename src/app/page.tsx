import HeroSearch from "@/components/home/HeroSearch";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedSection from "@/components/home/FeaturedSection";
import HowItWorks from "@/components/home/HowItWorks";
import Stats from "@/components/home/Stats";
import CtaRadar from "@/components/home/CtaRadar";

export default function Home() {
  return (
    <>
      <HeroSearch />
      <CategoryGrid />
      <FeaturedSection />
      <HowItWorks />
      <Stats />
      <CtaRadar />
    </>
  );
}
