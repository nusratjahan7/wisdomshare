import Banner from "@/Components/homepage/Banner";
import PhilosophySection from "@/Components/homepage/PhilosophySection";
import CDATASection from "@/Components/homepage/CDATASection";
import TopContributors from "@/Components/homepage/TopContributors";

export default function Home() {
  return (
    <main className=" min-h-screen pt-16">
      <Banner />
      <PhilosophySection />
      <TopContributors />
      <CDATASection />
    </main>
  );
}