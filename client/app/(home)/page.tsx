import MobileNav from "./components/Mobile-nav";
import { Testimonial } from "./components/Testimonial";
import Why from "./components/Why";
import WhyMobile from "./components/Why-mobile";
import Pricing from "./components/pricing";
import Hero from "./components/hero";
import AppStats from "./components/appStats";
import Footer from "./components/footer";
import VideoPlayer from "./components/videoPlayer";

export default function Home() {
  return (
    <section className=''>
      <MobileNav />
      <Hero />

      <Why />
      <WhyMobile />

      <VideoPlayer />

      <Testimonial />

      <AppStats />

      <Pricing />

      <Footer />
    </section>
  );
}
