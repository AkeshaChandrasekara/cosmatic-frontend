import { FaLeaf, FaRecycle, FaHeart, FaAward, FaUsers, FaGlobeAmericas } from "react-icons/fa";
import Footer from '../components/Footer';
//import Footer from '../../../components/Footer';

export default function AboutView() {
    return (
        <div className="bg-white">
          
            <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-20">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                Our Story of <span className="text-green-700">Natural Beauty</span>
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Born from a passion for purity and sustainability, we craft organic skincare 
                                that honors both your skin and our planet. Every product tells a story of 
                                ethical sourcing, scientific innovation, and natural efficacy.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700 font-medium">Since 2018</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700 font-medium">100% Organic</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700 font-medium">Cruelty-Free</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="/logoD.png" 
                                    alt="Our Natural Ingredients" 
                                    className="w-full h-50 object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-50 rounded-full flex items-center justify-center shadow-xl border border-green-100">
                                <FaLeaf className="w-8 h-8 text-green-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-8 border-b border-gray-100">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 ">
                        <h2 className="text-3xl font-medium text-gray-700 mb-2">
                           OUR PHILOSOPHY
                        </h2>
                        <p className="text-md text-gray-600 max-w-3xl mx-auto">
                            We believe beauty should be pure, effective, and sustainable - 
                            a harmony between nature's wisdom and scientific innovation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center group hover:transform hover:-translate-y-2 
                        transition-all duration-300 p-8 rounded-xl bg-green-50 hover:bg-green-100">
                            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center
                             mx-auto mb-6 transition-colors">
                                <FaLeaf className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Natural Purity</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We source only the finest organic ingredients, free from harsh chemicals, 
                                ensuring your skin receives nature's purest nourishment.
                            </p>
                        </div>
                        
                        <div className="text-center bg-green-50 group hover:transform hover:-translate-y-2 transition-all duration-300 p-8 rounded-xl hover:bg-green-50">
                            <div className="w-20 h-20 bg-green-200 rounded-full 
                            flex items-center justify-center mx-auto mb-6  transition-colors">
                                <FaRecycle className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainable Future</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our commitment extends beyond skincare to environmental stewardship, 
                                using eco-friendly packaging and supporting sustainable farming practices.
                            </p>
                        </div>
                        
                        <div className="text-center bg-green-50 group hover:transform hover:-translate-y-2 transition-all duration-300 p-8 rounded-xl hover:bg-green-50">
                            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center 
                            justify-center mx-auto mb-6 transition-colors">
                                <FaHeart className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ethical Excellence</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every product is cruelty-free, ethically sourced, and developed with 
                                respect for both people and the planet we share.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="bg-gray-50 py-16">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <img 
                                    src="/logoD.png" 
                                    alt="Our Journey" 
                                    className="w-full h-80 object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-16 h-16 bg-green-50 rounded-full flex items-center justify-center shadow-lg border border-green-100">
                                <FaAward className="w-8 h-8 text-green-700" />
                            </div>
                        </div>
                        <div className="text-left">
                            <h2 className="text-3xl font-bold text-gray-700 mb-4">
                            OUR JOURNEY
                            </h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                What began as a small kitchen experiment with natural ingredients has 
                                blossomed into a trusted brand loved by thousands. Our founder's personal 
                                struggle with sensitive skin inspired a quest for pure, effective solutions.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Today, we partner with organic farms worldwide and work with dermatologists 
                                to create products that deliver visible results while maintaining our 
                                commitment to sustainability and ethical practices.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-700 mb-2">5K+</div>
                                    <div className="text-gray-600">Happy Customers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-700 mb-2">15+</div>
                                    <div className="text-gray-600">Countries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-700 mb-2">100%</div>
                                    <div className="text-gray-600">Organic</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-700 mb-2">5★</div>
                                    <div className="text-gray-600">Average Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-medium text-gray-700 mb-2">
                         MEET OUR FOUNDERS
                        </h2>
                        <p className="text-md text-gray-600 max-w-2xl mx-auto">
                            The passionate minds behind our natural beauty revolution
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div className="text-center group">
                            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                <img 
                                    src="https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small_2x/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg" 
                                    alt="Founder" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Parami Fernando</h3>
                            <p className="text-green-600 font-medium mb-4">Founder & CEO</p>
                            <p className="text-gray-600 leading-relaxed">
                                With a background in herbal medicine and a passion for sustainable living, 
                                Sarah leads our product development with an unwavering commitment to purity 
                                and effectiveness.
                            </p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                <img 
                                    src="data:image/jpeg;base64,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" 
                                    alt="Co-Founder" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Peris</h3>
                            <p className="text-green-600 font-medium mb-4">Co-Founder & Head of Research</p>
                            <p className="text-gray-600 leading-relaxed">
                              Sarah's expertise in cosmetic science ensures our natural formulations 
                                deliver clinical-grade results while maintaining our ethical and 
                                environmental standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="bg-gray-50 py-16 border-t border-gray-100">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-medium text-gray-700 mb-2">
                           OUR COMMITMENT
                        </h2>
                        <p className="text-md text-gray-600 max-w-2xl mx-auto">
                            Beyond beauty - our promise to people and planet
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaLeaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Organic Farming</h3>
                            <p className="text-gray-600 text-sm">
                                Supporting organic farmers and sustainable agricultural practices worldwide
                            </p>
                        </div>
                        
                        <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaRecycle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Zero Waste</h3>
                            <p className="text-gray-600 text-sm">
                                Committed to recyclable and biodegradable packaging solutions
                            </p>
                        </div>
                        
                        <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaUsers className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Community</h3>
                            <p className="text-gray-600 text-sm">
                                Empowering communities through fair trade and educational initiatives
                            </p>
                        </div>
                        
                        <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaGlobeAmericas className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Carbon Neutral</h3>
                            <p className="text-gray-600 text-sm">
                                Working towards carbon neutrality across our entire supply chain
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-green-700 py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Join Our Natural Beauty Movement
                    </h2>
                    <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                        Experience the difference of truly organic, ethically crafted skincare 
                        that cares for your skin and our planet.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-green-700 font-semibold py-3 px-8 rounded-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-0.5">
                            Shop Our Collection
                        </button>
                       
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}