import Footer from "./ui/Footer";
import Header from "./ui/Header";
import Categories from "./ui/Home/Categories";
import FeatureProducts from "./ui/Home/FeatureProducts";
import FirstBanner from "./ui/Home/FirstBanner";
import FirstDynamicBanner from "./ui/Home/FirstDynamicBanner";
import Carousel from "./ui/Home/HomeCarousel";
import SecondDynamicBanner from "./ui/Home/SecondDynamicBanner";
import TrendingNow from "./ui/Home/TrendingNow";
import Video from "./ui/Home/Video";

export default function Home() {
  return (
    <>
      <Header />
      <main /* className="relative" */>
        {/* <Carousel /> */}
        <FirstBanner />
        <FeatureProducts />
        <Video />
        <Categories />
        <FirstDynamicBanner />
        <TrendingNow />
        <SecondDynamicBanner />
      </main>
      <Footer />
    </>
  );
}
