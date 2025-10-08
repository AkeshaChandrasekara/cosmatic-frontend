import React from 'react';

const instaImages = [
    { id: 1, src: 'poster1.jpg', alt: 'Woman applying mascara, The Ordinary product' },
    { id: 2, src: 'poster2.jpg', alt: 'Cosrx Niacinamide serum' },
    { id: 3, src: 'poster3.jpg', alt: 'CeraVe Facial Moisturizing Lotion' },
    { id: 4, src: 'poster4.jpg', alt: 'CeraVe SA Smoothing Cleanser' },

];

const InstagramFeed = () => {
    return (
        <section className="container mx-auto px-0 py-12 lg:py-16">
            {/* Section Header */}
            <h2 className="text-center text-xl font-light tracking-widest uppercase mb-8 text-gray-800">
                FOLLOW <a
                    href="https://www.instagram.com/naturalcosmeticslk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline transition-colors duration-200"
                >
                    @NATURALCOSMETICSLK
                </a> TO GET THE LATEST
            </h2>


            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-0 overflow-x-auto no-scrollbar">
                {instaImages.map(image => (
                    <div key={image.id} className="relative w-full aspect-square overflow-hidden group">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Optional: Add an overlay or icon on hover for engagement */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InstagramFeed;
