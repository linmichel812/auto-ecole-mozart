import { SeoHead } from '../components/seo/SeoHead';
import { AgenciesSection } from '../sections/home/AgenciesSection';
import { FAQSection } from '../sections/home/FAQSection';
import { FinalCTASection } from '../sections/home/FinalCTASection';
import { FormationsSection } from '../sections/home/FormationsSection';
import { HomeHero } from '../sections/home/HomeHero';
import { StatsSection } from '../sections/home/StatsSection';
import { TestimonialsSection } from '../sections/home/TestimonialsSection';
import { WhyMozartSection } from '../sections/home/WhyMozartSection';

export function HomePage() {
  return (
    <>
      <SeoHead />
      <HomeHero />
      <StatsSection />
      <WhyMozartSection />
      <FormationsSection />
      <AgenciesSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
