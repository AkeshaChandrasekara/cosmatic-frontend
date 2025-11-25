import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage";
import SignupPage from "./signupPage";
import Header from "../components/header";
import CartPage from "./cartPage";
import HomeView from "../components/homeView";
import ProductPage from "./productPage";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";
import { PuffLoader } from "react-spinners";

export default function HomePage() {
    const [loadingSections, setLoadingSections] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoadingSections(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setShowScrollButton(window.scrollY > 200);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <>

            <div className="min-h-screen w-full flex flex-col">
                <Header />

                <div className="flex-1 flex flex-col mt-[88px]">
                    {loadingSections ? (
                        <div className="flex-1 flex items-center justify-center bg-white">
                            <PuffLoader color="#00a048" loading={loadingSections} size={60} />
                        </div>
                    ) : (
                        <main className="flex-1">
                            <Routes>
                                <Route path="/" element={<HomeView />} />
                                <Route path="/product" element={<ProductPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                            </Routes>

                        </main>
                    )}

                    {showScrollButton && (
                        <button
                            onClick={scrollToTop}
                            className="fixed bottom-3 right-6 z-50 cursor-pointer bg-green-800 hover:bg-green-900 text-white p-3 rounded-full shadow-lg transition"
                        >
                            <FaArrowUp />
                        </button>
                    )}
                </div>
            </div>


        </>
    );
}
