import { HeroSection } from "~/components/hero-section";
import { TechSection } from "~/components/tech-section";

export default function Page() {
  return (
    <main className="*:container *:space-y-6 *:pb-12 *:pt-16 *:lg:py-28">
      <HeroSection />
      <TechSection />
    </main>
  );
}
