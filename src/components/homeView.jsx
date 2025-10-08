import { FaWhatsapp, FaFacebookMessenger, FaTelegramPlane } from "react-icons/fa";
import Footer from "./footer";
import Banner from "./banner";

import HomeShowcase from "./homeShowcase";
import WhatsNewSection from "./whatsNewSection";
import TrendingProductsSection from "./trendingProductsSection";
import SideBySideBanners from "./sideBySideBanners";
import ImporterSection from "./importerSection";
import ProductsYouMayLike from "./productsYouMayLike";
import InstagramFeed from "./instagramFeed";

export default function HomeView() {
    return (
        <div className="bg-white">
            {/* ---- Banner Section ---- */}
            <section className="bg-green-900">
                <Banner />
            </section>

            {/* ---- Showcase Section ---- */}
            <section className="bg-white">
                <HomeShowcase />
            </section>


            {/* ---- What's New Section ---- */}
            <section className="bg-white">
                <WhatsNewSection />
            </section>

            {/* ---- Trending Products Section ---- */}
            <section className="bg-white py-8">
                <TrendingProductsSection />
            </section>

            {/* ---- Side by Side Banners ---- */}
            <section className="bg-white py-8">
                <SideBySideBanners />
            </section>

            {/* ---- Importer Section ---- */}
            <section className="bg-white py-8">
                <ImporterSection />
            </section>

            {/* ---- Products You May Like Section ---- */}
            <section className="bg-white py-5">
                <ProductsYouMayLike />
            </section>

            {/* ---- Instagram Feed Section ---- */}
            <section className="bg-white py-5">
                <InstagramFeed />
            </section>

            {/* ---- Footer ---- */}
            <Footer />




            {/* ---- Floating Social Icons ---- */}
            <div className="fixed w-[50px] h-[140px] bg-green-800 bottom-1/2 right-0 flex flex-col items-center justify-around py-3 z-50 shadow-lg">
                <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:scale-110 transition-transform"
                >
                    <FaWhatsapp />
                </a>

                <a
                    href="https://m.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:scale-110 transition-transform"
                >
                    <FaFacebookMessenger />
                </a>

                <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:scale-110 transition-transform"
                >
                    <FaTelegramPlane />
                </a>
            </div>
        </div>
    );
}
