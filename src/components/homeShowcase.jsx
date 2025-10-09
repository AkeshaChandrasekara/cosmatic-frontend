import { FaSun, FaSpa, FaPumpSoap, FaSyringe, FaHandSparkles } from "react-icons/fa";

export default function HomeShowcase() {
    return (
        <section className="container mx-auto px-4 py-8 md:py-12 border-b border-gray-200">
            {/* ---- Top Category Icons ---- */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-[60px] text-center">
                {[
                    {
                        icon: "stickers/cosmetics.png",
                        label: "ALL CATEGORY"
                    },
                    {
                        icon: "stickers/facial.png",
                        label: "SKIN CARE"
                    },
                    {
                        icon: "stickers/spray.png",
                        label: "HAIR CARE"
                    },
                    {
                        icon: "stickers/sun-cream.png",
                        label: "SUN PROTECTION"
                    },
                    {
                        icon: "stickers/makeup.png",
                        label: "MAKE UP"
                    },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                        <div className="w-15 h-15 flex items-center justify-center bg-green-100 rounded-full shadow-sm mb-2">
                            <img src={item.icon} alt={item.label} className="w-8 h-8 object-contain" />
                        </div>
                        <p className="text-sm font-light tracking-wide text-gray-800">{item.label}</p>
                    </div>
                ))}
            </div>


            {/* ---- Banner Cards ---- */}

            <div className="grid grid-cols-1  md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mb-5">
                {[
                    {
                        img: "/poster1.jpg",
                        title: "Koji San Soap",
                        desc: "Known for skin lightening properties",
                    },
                    {
                        img: "/poster2.jpg",
                        title: "CeraVe Cleanser",
                        desc: "Gentle care for blemish-prone skin",
                    },
                    {
                        img: "/poster3.jpg",
                        title: "Dark Spot Glow Serum",
                        desc: "Diminish the appearance of dark spots & scars",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white  overflow-hidden shadow-md hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                    >
                        <img src={item.img} alt={item.title} className="w-full h-84 rounded-t-lg object-cover" />
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>



        </section>
    );
}
