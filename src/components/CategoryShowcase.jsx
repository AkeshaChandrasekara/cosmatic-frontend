import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function CategoryShowcase() {
    const categories = [
        {
            name: "Skin Care",
            description: "Nourish and rejuvenate your skin with natural formulations",
            image: "/categories/skincare.jpg",
            count: "Premium Products",
            link: "/product?category=skin-care",
            gradient: "from-blue-50 to-white"
        },
        {
            name: "Hair Care",
            description: "Transform your hair with organic treatments and conditioners",
            image: "/categories/haircare.jpg",
            count: "Natural Solutions",
            link: "/product?category=hair-care",
            gradient: "from-purple-50 to-white"
        },
        {
            name: "Sun Protection",
            description: "Advanced natural UV protection for healthy skin",
            image: "/categories/sunprotection.jpg",
            count: "SPF Protection",
            link: "/product?category=sun-protection",
            gradient: "from-orange-50 to-white"
        },
        {
            name: "Body Care",
            description: "Pamper your body with luxurious organic moisturizers",
            image: "/categories/bodycare.jpg",
            count: "Hydration Care",
            link: "/product?category=body-care",
            gradient: "from-green-50 to-white"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Shop By Category</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Explore our diverse range of organic beauty products tailored to your specific needs
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={category.link}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                        <div className={`bg-gradient-to-br ${category.gradient} p-8 h-64 flex items-center justify-between`}>
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 text-lg mb-4">{category.description}</p>
                                <div className="flex items-center gap-3 text-green-600 font-semibold">
                                    <span>{category.count}</span>
                                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-green-600">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}