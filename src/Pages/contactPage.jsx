import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLeaf, FaHeadset } from "react-icons/fa";
import Footer from "../components/footer";
//import Footer from '../../components/Footer';

export default function ContactPage() {
    return (
        <div className="bg-white">
           
            <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-20">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                                Get In <span className="text-green-700">Touch</span>
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                We're here to help you on your natural beauty journey. 
                                Whether you have questions about our products or need skincare advice, 
                                our team is ready to assist you.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700 font-medium">24/7 Support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700 font-medium">Expert Advice</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700 font-medium">Quick Response</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="/logoD.png" 
                                    alt="Customer Support" 
                                    className="w-full h-50 object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-50 rounded-full flex items-center justify-center shadow-xl border border-green-100">
                                <FaHeadset className="w-8 h-8 text-green-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="bg-white py-16">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-medium text-gray-700 mb-2">
                            CONTACT US
                        </h2>
                        <p className="text-md text-gray-600 max-w-3xl mx-auto">
                            Reach out to us through any of these channels - we're always happy to connect 
                            with fellow nature enthusiasts and skincare lovers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                          <div className="bg-green-50  rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-all duration-300"
                                            placeholder="Your first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-all duration-300"
                                            placeholder="Your last name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-all duration-300"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-all duration-300">
                                        <option>General Inquiry</option>
                                        <option>Product Support</option>
                                        <option>Shipping Question</option>
                                        <option>Returns & Exchanges</option>
                                        <option>Partnership</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows="5"
                                        className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-all duration-300 resize-none"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-green-600 hover:shadow-xl hover:transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                       
                        <div className="space-y-8">
                            <div className="bg-green-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group hover:transform hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                            <FaPhoneAlt className="w-5 h-5 text-green-700" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                                            <p className="text-gray-600">+94 77 123 4567</p>
                                            <p className="text-sm text-gray-500">Mon-Fri, 8:00 AM - 6:00 PM</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group hover:transform hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                            <FaEnvelope className="w-5 h-5 text-green-700" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                                            <p className="text-gray-600">hello@organiccosmetics.com</p>
                                            <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group hover:transform hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                                            <FaMapMarkerAlt className="w-5 h-5 text-green-700" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">Office</h4>
                                            <p className="text-gray-600">125 Green Street</p>
                                            <p className="text-gray-600">Colombo, Sri Lanka</p>
                                            <p className="text-sm text-gray-500">Visit us by appointment</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-green-200">
                                    <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors group">
                                            <FaFacebook className="w-4 h-4 text-green-700 group-hover:text-green-800" />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors group">
                                            <FaInstagram className="w-4 h-4 text-green-700 group-hover:text-green-800" />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors group">
                                            <FaTwitter className="w-4 h-4 text-green-700 group-hover:text-green-800" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                         
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4 text-center border border-green-100 shadow-sm">
                                    <div className="text-2xl font-bold text-green-700 mb-1">2h</div>
                                    <div className="text-sm text-gray-600">Avg. Response</div>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center border border-green-100 shadow-sm">
                                    <div className="text-2xl font-bold text-green-700 mb-1">24/7</div>
                                    <div className="text-sm text-gray-600">Support</div>
                                </div>
                            </div>
                        </div>

                      
                    </div>
                </div>
            </section>

            
            <section className="bg-gray-50 py-16 border-t border-gray-100">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-medium text-gray-700 mb-2">
                            FREQUENTLY ASKED QUESTIONS
                        </h2>
                        <p className="text-md text-gray-600">
                            Quick answers to common questions about our products and services
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: "How long does shipping take?",
                                answer: "We typically process orders within 1-2 business days. Domestic shipping takes 3-5 business days, while international shipping takes 7-14 business days."
                            },
                            {
                                question: "Are your products truly organic?",
                                answer: "Yes! All our products are certified organic and contain at least 95% organic ingredients. We're committed to transparency and purity."
                            },
                            {
                                question: "Do you offer international shipping?",
                                answer: "We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
                            },
                            {
                                question: "What is your return policy?",
                                answer: "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, you can return it for a full refund or exchange."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-green-100">
                                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-green-700 py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to Start Your Natural Beauty Journey?
                    </h2>
                    <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have transformed their skincare routine 
                        with our organic, ethically crafted products.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-green-700 font-semibold py-3 px-8 rounded-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-0.5">
                            Shop Collection
                        </button>
                        <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-green-700 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}