import React from 'react';

const FeatureIconPlaceholder = ({ icon }) => (
    <div className="w-14 h-14 flex items-center justify-center mx-auto mb-3">
        {icon ? (
            <img
                src={icon}
                alt="Feature icon"
                className="w-full h-full object-contain"
            />
        ) : (
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-lg">
                ?
            </div>
        )}
    </div>
);

const ImporterSection = () => {
    const features = [
        {
            icon: "stickers/favorites.png",
            title: "100% Trustworthy",
            description: "Sri Lanka’s trusted Cosmetic Importer",
        },
        {
            icon: "stickers/in-stock.png",
            title: "Guaranteed Quality",
            description: "Premium products from its’ origin",
        },
        {
            icon: "stickers/features.png",
            title: "Cash on delivery",
            description: "Pay By Cash islandwide",
        },
        {
            icon: "stickers/weight.png",
            title: "FREE & Quick Delivery",
            description: "Deliver products within 24 hours",
        },
    ];

    return (
        <section className="container mx-auto px-4 py-8 lg:py-24 border-b border-gray-200 ">
            {/* -------------------- Top Section: Text and Image -------------------- */}
            <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
                {/* Left Content (Text) */}
                <div className="lg:w-1/2 p-4 lg:pr-12 mb-8 lg:mb-0">
                    <h1
                        className="text-3xl md:text-4xl font-light leading-tight max-w-lg text-green-800"

                    >
                        Sri Lanka’s trusted <br />
                        Cosmetic Importer <br />
                        <span className="font-light">since 2025</span>
                    </h1>

                    <p className="mt-6 mb-8 text-base text-gray-600 max-w-lg">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap
                        into electronic typesetting, remaining essentially unchanged.
                    </p>

                    <button className="border border-gray-400 text-gray-700 font-medium py-2 px-6 hover:bg-gray-50 transition duration-150 text-sm tracking-wider">
                        READ MORE
                    </button>
                </div>

                {/* Right Image */}
                <div className="lg:w-1/2 relative  min-h-64 rounded-lg overflow-hidden">
                    <img
                        src="cosmatic-whomen.jpg"
                        alt="Woman applying cream"
                        className="w-full h-[400px] object-cover object-center"
                    />
                    <div className="absolute top-0 right-0 h-full w-1/4"></div>
                </div>
            </div>

            {/* -------------------- Bottom Section: Features Grid -------------------- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100">
                {features.map((feature, index) => (
                    <div key={index} className="text-center p-4">
                        <FeatureIconPlaceholder icon={feature.icon} />
                        <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600 px-2">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ImporterSection;
