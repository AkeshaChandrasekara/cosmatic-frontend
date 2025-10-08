import React from 'react';
import ProductCard from './productCard';


const productsData = [
    { id: 1, imageSrc: '/poster1.jpg', brandName: 'SKIN1004', productName: 'Madagascar Centella Tone Brightening Capsule Ampoule', discount: '-9%', currentPrice: 5900, oldPrice: 6500 },
    { id: 2, imageSrc: '/poster2.jpg', brandName: 'The Ordinary', productName: 'Niacinamide 10% + Zinc 1%', discount: '-10%', currentPrice: 5200, oldPrice: 5800 },
    { id: 3, imageSrc: '/poster3.jpg', brandName: 'The Ordinary', productName: 'Glycolic Acid 7% Toning Solution', discount: null, currentPrice: 5900, oldPrice: 5900 },
    { id: 4, imageSrc: '/poster4.jpg', brandName: 'ANUA', productName: 'Niacinamide 10% + TXA 4% Dark Spot Correcting Serum 30ml', discount: '-5%', currentPrice: 6500, oldPrice: 6800 },
    { id: 5, imageSrc: '/poster1.jpg', brandName: 'Dr.Althea', productName: '345 Relief Cream 50ml', discount: null, currentPrice: 6900, oldPrice: 7500 },
];

const WhatsNewSection = () => {
    return (
        <section className="container mx-auto px-4 py-5 md:py-12 border-b border-gray-200">
            {/* Section Header */}
            <h2 className="text-center text-xl md:text-2xl font-light tracking-widest uppercase mb-8">
                WHAT'S NEW
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
                {productsData.map(product => (
                    <ProductCard
                        key={product.id}
                        imageSrc={product.imageSrc}
                        brandName={product.brandName}
                        productName={product.productName}
                        discount={product.discount}
                        currentPrice={product.currentPrice}
                        oldPrice={product.oldPrice}
                    />
                ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
                <button className="border border-gray-400 text-gray-700 font-medium py-2 px-6 hover:bg-gray-100 transition duration-150">
                    VIEW ALL
                </button>
            </div>


            {/* Banner Image */}

            <div className="container mx-auto px-4 my-10">
                <div className="relative overflow-hidden md:h-[500px] bg-purple-200 p-8 md:p-12 lg:p-16 rounded-lg shadow-xl cursor-pointer">

                    <div className="absolute inset-0 "></div>



                    <div className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700">
                        <img
                            src="banner1.png"
                            alt="Retinol Intensive Reactivating Serum"
                            className="w-full h-full object-cover "
                        />
                    </div>

                    {/* Content */}
                </div>

            </div>
        </section>
    );
};

export default WhatsNewSection;