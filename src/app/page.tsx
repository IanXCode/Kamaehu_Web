import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AIFoodLog from "@/components/AIFoodLog";
import Features from "@/components/Features";
import ComparisonTable from "@/components/ComparisonTable";
import BuiltByLifter from "@/components/BuiltByLifter";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <AIFoodLog />
        <Features />
        <ComparisonTable />
        <BuiltByLifter />
        <Download />
      </main>
      <Footer />
    </>
  );
}
