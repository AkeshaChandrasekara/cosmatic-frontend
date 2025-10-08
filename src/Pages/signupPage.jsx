import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaLeaf, FaGoogle, FaFacebookF } from "react-icons/fa";
import Footer from "../components/footer";
import toast from "react-hot-toast";

export default function SignupPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    async function Signup(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + '/api/users/signup',
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    role: "user",
                }
            );

            if (response.data.user) {
                toast.error(response.data.message);

            } else {
                toast.success(response.data.message);
            }




            navigate('/');

        } catch (error) {
            const errorMsg = error?.response?.data?.message || "Signup failed.";
            toast.error(errorMsg);
        }
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col md:flex-row bg-green-50">

                <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-5 bg-green-900">
                    <div className="flex w-full h-[300px] flex-col justify-center items-center gap-4 ">
                        <img
                            src="logo.png"
                            alt="Thilakshana Logo"
                            className="w-48 h-48 md:w-120 md:h-30 object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <span className="text-center text-white text-[16px] leading-relaxed lg:w-[480px]">
                            Join us and embrace pure organic cosmetics made with nature’s best herbs and oils.
                            Your journey to natural beauty starts here 🌿
                        </span>
                    </div>
                </div>


                <div className="w-full md:w-1/2 flex justify-center items-center p-5 bg-green-900 min-h-screen">
                    <div className="w-full max-w-md bg-white shadow-lg p-10 flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2 justify-center">
                            <FaLeaf /> Sign Up
                        </h1>


                        <form action="" onSubmit={Signup} className="space-y-4 mt-3">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                            />

                            <button
                                type="submit"
                                className="w-full py-3 bg-green-900 text-white font-medium shadow hover:bg-green-800 transition-colors duration-300 cursor-pointer"
                            >
                                Sign Up
                            </button>

                        </form>


                        <div className="flex items-center gap-2 text-gray-400 my-2">
                            <hr className="flex-1 border-t border-gray-300" />
                            <span className="text-sm">or sign up with</span>
                            <hr className="flex-1 border-t border-gray-300" />
                        </div>

                        {/* <div className="flex flex-col gap-3">
                        <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-green-200 rounded-xl hover:bg-green-100 transition cursor-pointer">
                            <FaGoogle className="text-green-800" /> Sign up with Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-green-200 rounded-xl hover:bg-green-100 transition cursor-pointer">
                            <FaFacebookF className="text-green-800" /> Sign up with Facebook
                        </button>
                    </div> */}

                        <p className="text-center text-gray-600 text-sm mt-2">
                            Already have an account?{" "}
                            <Link to="/login" className="text-green-700 hover:underline font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-auto ">
                <Footer />
            </div>

        </>
    );
}
