import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Banner() {
    const heroBanners = [
        {
            image: "/banner3.jpg",
            title: "PURE. NATURAL. BEAUTY.",
            subtitle: "Glow with skincare powered by nature.",
        },
        {
            image: "/banner2.jpg",
            title: "ORGANIC SELF-CARE",
            subtitle: "Nurture your skin with safe, eco-friendly cosmetics.",
        },
        {
            image: "/banner1.png",
            title: "ELEGANCE FROM NATURE",
            subtitle: "Sustainable beauty crafted for you.",
        },

    ];


    const [index, setIndex] = useState(0);


    const prevSlide = () => {
        setIndex((prev) =>
            prev === 0 ? heroBanners.length - 1 : prev - 1
        );
    };


    const nextSlide = () => {
        setIndex((prev) =>
            prev === heroBanners.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <section className="relative w-full h-[60vh] md:h-[80vh]  overflow-hidden ">

            <img
                src={heroBanners[index].image}
                alt={heroBanners[index].title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700"
            />


            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                <h1 className="text-4xl sm:text-6xl font-semibold tracking-wide uppercase mb-4 leading-tight drop-shadow-md">
                    {heroBanners[index].title}
                </h1>
                <p className="text-lg sm:text-xl max-w-2xl mb-8 opacity-90 font-light">
                    {heroBanners[index].subtitle}
                </p>
                <button
                    className="px-8 py-3 bg-white rounded-full text-gray-900 hover:bg-gray-100 font-medium text-base shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => (window.location.href = "/product")}
                >
                    Shop Now
                </button>
            </div>


            <button
                onClick={prevSlide}
                className="absolute left-4 bg-green-900 cursor-pointer top-1/2 transform -translate-y-1/2 z-20 text-white p-3 rounded-full shadow-lg transition"
            >
                <HiChevronLeft size={26} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 bg-green-900 cursor-pointer top-1/2 transform -translate-y-1/2 z-20 text-white p-3 rounded-full shadow-lg transition"
            >
                <HiChevronRight size={26} />
            </button>


            <div className="absolute bottom-6 right-1/2 flex gap-2 z-20">
                {heroBanners.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2.5 h-2.5 transition-all rounded-full duration-300 ${i === index ? "bg-white" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
