import React from "react";
import HeroSection from "../components/Hero/HeroSection";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import CTASection from "../components/CTA/CTASection";
import NewsletterSection from "../components/Newsletter/NewsletterSection";
import FeaturedRecipes from "../components/FeaturedRecipes/FeaturedRecipes";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRecipes />
      <HowItWorks />
      <CTASection />
      <NewsletterSection />
    </>
  );
}
