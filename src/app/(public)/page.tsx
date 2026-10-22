// import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/home/Hero";
import Categories from "@/src/components/home/Categories";
import BestSellers from "@/src/components/home/Beetsellers";
import SpecialOffer from "@/src/components/home/Specialoffer";
import PizzaBuilderPreview from "@/src/components/home/Pizzabuilderpreview";
import WhyChoose from "@/src/components/home/Whychoose";
import FreshFromOven from "@/src/components/home/Freshfromoven";
import Reviews from "@/src/components/home/Reviews";
import HowItWorks from "@/src/components/home/Howitworks";
import FinalCtaAndNewsletter from "@/src/components/home/Finalctaandnewsletter";
// import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      {/* <Navbar /> */}
      <Hero />
      <Categories />
      <BestSellers />
      <SpecialOffer />
      <PizzaBuilderPreview />
      <WhyChoose />
      <FreshFromOven />
      <Reviews />
      <HowItWorks />
      <FinalCtaAndNewsletter />
      {/* <Footer /> */}
    </main>
  );
}