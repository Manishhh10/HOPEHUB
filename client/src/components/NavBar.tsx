import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../stores";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo2.svg";

function NavBar() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return (
        <header className="bg-[#f8f7e8] text-[#333]">
            <div className="max-w-[1350px] mx-auto px-4 h-24 flex items-center justify-between">
                {/* Left side */}
                <nav className="flex items-center space-x-6">
                    <Link to="/" className="hover:text-[#0b4029] transition">
                        Home
                    </Link>
                    {isLoggedIn && (
                        <Link
                            to="/CreateFund"
                            className="bg-[#0b3d40] text-secondary px-5 py-2 rounded hover:opacity-80 transition"
                        >
                            Start A Hope
                        </Link>
                    )}
                </nav>
                {/* Center brand text */}
                <img
                    src={logo}
                    alt="HopeHub"
                    className="w-28 max-[500px]:hidden"
                />

                {/* Right side */}
                <nav className="flex items-center space-x-6">
                    {!isLoggedIn && (
                        <>
                            <Link
                                to="/signup"
                                className="hover:text-[#0b3d40] transition"
                            >
                                Signup
                            </Link>
                            <Link
                                to="/login"
                                className="hover:text-[#0b3d40] transition"
                            >
                                Login
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Link
                                to="/about"
                                className="hover:text-[#0b3d40] transition"
                            >
                                About
                            </Link>
                            <Link
                                to="/account"
                                className="hover:text-[#0b3d40] transition flex justify-center items-center"
                            >
                                Account{" "}
                                <FaChevronDown className="text-xs ml-2" />
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
