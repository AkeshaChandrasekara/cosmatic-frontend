export default function HomeShowcase() {
    return (
        <section className="max-w-9xl mx-auto px-4 sm:px-6 py-8">
          
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-16 text-center">
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
                    <div key={i} className="flex flex-col items-center group cursor-pointer">
                        <div className="w-20 h-20 flex items-center justify-center bg-white border border-green-200 rounded-2xl shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 mb-4">
                            <img src={item.icon} alt={item.label} className="w-10 h-10 object-contain" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">{item.label}</p>
                    </div>
                ))}
            </div>

            
        </section>
    );
}