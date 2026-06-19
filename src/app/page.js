import Banner from "@/Components/homepage/Banner";
import PhilosophySection from "@/Components/homepage/PhilosophySection";
import CDATASection from "@/Components/homepage/CDATASection";

export default function Home() {
  return (
    <main className="bg-[#030712] min-h-screen pt-16">
      <Banner />
      <PhilosophySection />
      <CDATASection />
    </main>
  );
}