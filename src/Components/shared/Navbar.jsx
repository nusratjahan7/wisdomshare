"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Lessons", href: "/lessons" },
    { name: "Pricing", href: "/pricing" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isOpen || isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
                : "bg-transparent"
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
                        {navLinks.map((link) => (
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

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/auth/signin"
                            className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                        >
                            Signup
                        </Link>
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-6 flex flex-col gap-1 pt-2 bg-transparent animate-fadeIn">
                        {navLinks.map((link) => (
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

                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
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
                                className="w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-95 transition-opacity"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;