import React from 'react';


const BannerCard = ({ title, imageSrc, isDark = false }) => (
    <div className="relative w-full h-72 sm:h-96 overflow-hidden rounded-lg">
        {/* Background Image */}
        <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
        />


        {!isDark && (
            <div className="absolute inset-0 bg-black/10"></div>
        )}


    </div>
);

const SideBySideBanners = () => {
    return (
        <section className="container mx-auto px-4 my-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <BannerCard
                    title="Effective + Well-Tolerated"
                    description="Packed with Niacinamide 10% for oil control and smaller pores"
                    buttonText="SHOP NOW"
                    imageSrc="banner2.jpg"
                    isDark={true}
                />


                <BannerCard
                    title="Glow Like Never Before"
                    description="Unveil radiant, hydrated skin with this powerhouse serum"
                    buttonText="SHOP NOW"
                    imageSrc="banner1.png"
                    isDark={false}
                />
            </div>
        </section>
    );
};

export default SideBySideBanners;