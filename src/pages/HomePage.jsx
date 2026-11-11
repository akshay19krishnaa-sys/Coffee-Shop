import { Hero } from '../components/Hero';
import { FeaturedCoffees } from '../components/FeaturedCoffees';
import { SpecialCollections } from '../components/SpecialCollections';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CafeExperience } from '../components/CafeExperience';
import { Testimonials } from '../components/Testimonials';
import { FinalCTA } from '../components/FinalCTA';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedCoffees />
      <SpecialCollections />
      <WhyChooseUs />
      <CafeExperience />
      <Testimonials />
      <FinalCTA />
    </>
  );
};

