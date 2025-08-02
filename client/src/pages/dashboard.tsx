import ModernHeader from "@/components/modern-header";
import HeroSection from "@/components/hero-section";
import ToolsSection from "@/components/tools-section";
import HowToUse from "@/components/how-to-use";
import ModernFooter from "@/components/modern-footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ModernHeader />
      <HeroSection />
      <ToolsSection />
      <HowToUse />
      <ModernFooter />
    </div>
  );
}