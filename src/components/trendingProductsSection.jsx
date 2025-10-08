// src/components/TrendingProductsSection.jsx

import React, { useState } from 'react';
import ProductCard from './productCard';

const tabs = ['ALL CATEGORIES', 'SKIN CARE', 'HAIR CARE', 'SUN PROTECTION'];

// Dummy Data (replace with actual data)
const productsData = [
  { id: 1, imageSrc: 'poster1.jpg', brandName: 'SKIN1004', productName: 'Madagascar Centella Tone Brightening Capsule Ampoule', discount: '-9%', currentPrice: 5900, oldPrice: 6500 },
  { id: 2, imageSrc: 'poster2.jpg', brandName: 'The Ordinary', productName: 'Niacinamide 10% + Zinc 1%', discount: '-10%', currentPrice: 5200, oldPrice: 5800 },
  { id: 3, imageSrc: 'poster3.jpg', brandName: 'The Ordinary', productName: 'Glycolic Acid 7% Toning Solution', discount: null, currentPrice: 5900, oldPrice: 5900 },
  { id: 4, imageSrc: 'poster4.jpg', brandName: 'ANUA', productName: 'Niacinamide 10% + TXA 4% Dark Spot Correcting Serum 30ml', discount: '-5%', currentPrice: 6500, oldPrice: 6800 },
  { id: 5, imageSrc: 'poster1.jpg', brandName: 'Dr.Althea', productName: '345 Relief Cream 50ml', discount: '-8%', currentPrice: 6900, oldPrice: 7500 },
];

const TrendingProductsSection = () => {
  const [activeTab, setActiveTab] = useState('ALL CATEGORIES');

  const handleTabClick = (tab) => {
    setActiveTab(tab);

  };

  return (
    <section className="container mx-auto px-4 py-8 md:py-5 border-b border-gray-200">
      {/* Section Header */}
      <h2 className="text-center text-xl md:text-2xl font-light tracking-widest uppercase mb-8">
        TRENDING PRODUCTS
      </h2>

      {/* Tab Navigation */}
      <div className="flex justify-center border-b border-gray-200 mb-10 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`
              py-3 px-4 sm:px-6 text-sm font-semibold whitespace-nowrap transition-colors duration-200
              ${activeTab === tab
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

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
    </section>
  );
};

export default TrendingProductsSection;