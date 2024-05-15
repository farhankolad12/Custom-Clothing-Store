import Footer from "./ui/Footer";
import Header from "./ui/Header";
import Categories from "./ui/Home/Categories";
import CategoriesBanners from "./ui/Home/CategoriesBanners";
import FeatureProducts from "./ui/Home/FeatureProducts";
import FirstBanner from "./ui/Home/FirstBanner";
import FirstDynamicBanner from "./ui/Home/FirstDynamicBanner";
import HomeCarousel from "./ui/Home/HomeCarousel";
import Carousel from "./ui/Home/HomeCarousel";
import HomeCategories from "./ui/Home/HomeCategories";
import NewCollections from "./ui/Home/NewCollections";
import SecondDynamicBanner from "./ui/Home/SecondDynamicBanner";
import TrendingNow from "./ui/Home/TrendingNow";
import Video from "./ui/Home/Video";

export default function Home() {
  return (
    <div>
      <Header />
      <main /* className="relative" */>
        <HomeCarousel />
        <HomeCategories />
        {/* <FirstBanner /> */}
        {/* <Video /> */}
        {/* <Categories /> */}
        <FirstDynamicBanner />
        <NewCollections />
        <CategoriesBanners />
        <FeatureProducts />
        {/* <TrendingNow /> */}
        {/* <SecondDynamicBanner /> */}
      </main>
      <Footer />
    </div>
  );
}
