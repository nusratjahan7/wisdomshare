"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Lessons", href: "/lessons" },
    { name: "Pricing", href: "/pricing", protected: true },
];

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");
    const [isScrolled, setIsScrolled] = useState(false);

    const dropdownRef = useRef(null);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const dashboardPath = user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        const loadingToast = toast.loading("Signing out...");
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed out successfully!", { id: loadingToast });
                        setUserDropdownOpen(false);
                        setIsOpen(false);
                        router.push("/");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            toast.error("Sign out failed. Try again.", { id: loadingToast });
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name.charAt(0).toUpperCase();
    };

    const visibleLinks = navLinks.filter(link => !link.protected || user);

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${isOpen || isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-sm"
                : "shadow-xs"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center h-full">
                        <Image
                            src="/assets/logo.png"
                            alt="WisdomShare Logo"
                            width={140}
                            height={40}
                            className="object-contain w-auto h-9"
                            priority
                        />
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {visibleLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setActiveLink(link.name)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeLink === link.name
                                    ? "bg-purple-50 text-purple-600"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons / User Avatar */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            /* Logged In Status: Avatar & Dropdown */
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="w-10 h-10 rounded-full overflow-hidden border border-purple-200 bg-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-sm focus:outline-none hover:ring-2 hover:ring-purple-400 transition-all"
                                >
                                    {user.image ? (
                                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{getInitials(user.name)}</span>
                                    )}
                                </button>

                                {/* Desktop Dropdown Menu */}
                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 origin-top-right">
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                            <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={() => setUserDropdownOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                        >
                                            <UserIcon size={16} /> Profile
                                        </Link>

                                        <Link
                                            href={dashboardPath}
                                            onClick={() => setUserDropdownOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                        >
                                            <LayoutDashboard size={16} /> Dashboard
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                        >
                                            <LogOut size={16} /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Logged Out Status: Default Buttons */
                            <>
                                <Link
                                    href="/auth/signin"
                                    className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-6 flex flex-col gap-1 pt-2 bg-white animate-fadeIn">
                        {visibleLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => {
                                    setActiveLink(link.name);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeLink === link.name
                                    ? "bg-purple-50 text-purple-600 font-semibold"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gray-100">
                            {user ? (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                                    >
                                        <UserIcon size={16} /> Profile
                                    </Link>

                                    <Link
                                        href={dashboardPath}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                                    >
                                        <LayoutDashboard size={16} /> Dashboard
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 text-left"
                                    >
                                        <LogOut size={16} /> Sign out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/signin"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 transition-opacity"
                                    >
                                        Signup
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;