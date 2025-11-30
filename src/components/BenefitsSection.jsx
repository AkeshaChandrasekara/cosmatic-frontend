import { FiShield, FiHeart, FiAward, FiFeather } from 'react-icons/fi';

export default function BenefitsSection() {
    const benefits = [
        {
            icon: FiFeather,
            title: "100% Natural Ingredients",
            description: "Pure organic formulations free from harmful chemicals and synthetic additives"
        },
        {
            icon: FiShield,
            title: "Cruelty Free",
            description: "Ethically produced without animal testing, respecting all living beings"
        },
        {
            icon: FiHeart,
            title: "Skin Friendly",
            description: "Gentle formulas suitable for all skin types including sensitive skin"
        },
        {
            icon: FiAward,
            title: "Premium Quality",
            description: "Laboratory tested and dermatologist approved for optimal results"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Organic Cosmetics?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Experience the difference with our commitment to purity, quality, and sustainability. 
                    Every product is crafted with care for your skin and the environment.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                    <div key={index} className="text-center group p-6 rounded-2xl hover:bg-green-50 transition-all duration-300">
                        <div className="w-20 h-20 bg-white border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:border-green-600 transition-all duration-300 shadow-sm">
                            <benefit.icon className="w-10 h-10 text-green-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}