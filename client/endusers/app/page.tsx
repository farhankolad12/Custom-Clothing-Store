import Footer from "./ui/Footer";
import Header from "./ui/Header";
import CategoriesBanners from "./ui/Home/CategoriesBanners";
import FeatureProducts from "./ui/Home/FeatureProducts";
import FirstDynamicBanner from "./ui/Home/FirstDynamicBanner";
import HomeCarousel from "./ui/Home/HomeCarousel";
import HomeCategories from "./ui/Home/HomeCategories";
import NewCollections from "./ui/Home/NewCollections";

export default function Home() {
  return (
    <div>
      <Header />
      <main /* className="relative" */>
        <HomeCarousel />
        <HomeCategories />
        <FeatureProducts />
        <FirstDynamicBanner />
        <NewCollections />
        <CategoriesBanners />
      </main>
      <Footer />
    </div>
  );
}
