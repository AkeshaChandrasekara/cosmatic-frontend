import React from 'react';
import ProductCard from './productCard';


const productsData = [
    // --- First Row ---
    { id: 1, imageSrc: 'poster1.jpg', brandName: 'SKIN1004', productName: 'Madagascar Centella Tone Brightening Capsule Ampoule', discount: '-9%', currentPrice: 5900, oldPrice: 6500 },
    { id: 2, imageSrc: 'poster3.jpg', brandName: 'The Ordinary', productName: 'Niacinamide 10% + Zinc 1%', discount: '-10%', currentPrice: 5200, oldPrice: 5800 },
    { id: 3, imageSrc: 'poster2.jpg', brandName: 'The Ordinary', productName: 'Glycolic Acid 7% Toning Solution', discount: null, currentPrice: 5900, oldPrice: 5900 },
    { id: 4, imageSrc: 'poster4.jpg', brandName: 'ANUA', productName: 'Niacinamide 10% + TXA 4% Dark Spot Correcting Serum 30ml', discount: '-5%', currentPrice: 6500, oldPrice: 6800 },
    { id: 5, imageSrc: 'poster2.jpg', brandName: 'Dr.Althea', productName: '345 Relief Cream 50ml', discount: '-8%', currentPrice: 6900, oldPrice: 7500 },

    // --- Second Row ---
    { id: 6, imageSrc: 'poster1.jpg', brandName: 'Skin 1004', productName: 'Hyalu-Cica Water-Fit Sun Serum', discount: null, currentPrice: 5500, oldPrice: 5500 },
    { id: 7, imageSrc: 'poster4.jpg', brandName: 'The Ordinary', productName: 'Alpha Arbutin 2% + HA 30ml', discount: '-15%', currentPrice: 5500, oldPrice: 6500 },
    { id: 8, imageSrc: 'poster1.jpg', brandName: 'AXIS-Y', productName: 'Dark Spot Correcting Glow Serum', discount: null, currentPrice: 5200, oldPrice: 5200 },
    { id: 9, imageSrc: 'poster2.jpg', brandName: 'Kojie San', productName: 'Soap Classic 135g', discount: null, currentPrice: 1900, oldPrice: 1900 },
    { id: 10, imageSrc: 'poster3.jpg', brandName: 'Beauty of Joseon', productName: 'Relief Sun Aqua-Fresh: Rice + 50+ PA++++', discount: '-6%', currentPrice: 5500, oldPrice: 5900 },
];

const ProductsYouMayLike = () => {
    return (
        <section className="container mx-auto px-4 py-8 border-b border-gray-200">
            {/* Section Header */}
            <h2 className="text-center text-xl md:text-2xl font-light tracking-widest uppercase mb-16 text-gray-800">
                PRODUCTS YOU MAY LIKE
            </h2>


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
            <div className="flex justify-center mt-12">
                <button className="border border-gray-400 text-gray-700 font-medium py-2 px-6 hover:bg-gray-100 transition duration-150 tracking-wider text-sm">
                    VIEW ALL
                </button>
            </div>
        </section>
    );
};

export default ProductsYouMayLike;