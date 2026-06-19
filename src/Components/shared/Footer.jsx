"use client"
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';


const socialLinks = [
    { icon: FaTwitter, href: "#", label: "X (Twitter)" },
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaGithub, href: "#", label: "GitHub" },
];

const Footer = () => {
    return (
        <footer className="w-full bg-[#030712] text-gray-400 py-12 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">

                    {/* Brand Section */}
                    <div className="flex flex-col">
                        <Link href="/">
                            <div className="w-40 h-20 relative"> {/* Parent container must have 'relative' */}
                                <Image
                                    src="/assets/logo.png"
                                    alt="WisdomShare Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs text-gray-400">
                            A community platform where real people share the lessons that shaped their lives. Every story has value.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-2">
                            {socialLinks.map((social, idx) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <IconComponent size={16} strokeWidth={2} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-1">
                            Platform
                        </h3>
                        <Link href="/lessons" className="text-sm hover:text-white transition-colors w-fit">Browse Lessons</Link>
                        <Link href="/contributors" className="text-sm hover:text-white transition-colors w-fit">Top Contributors</Link>
                        <Link href="/pricing" className="text-sm hover:text-white transition-colors w-fit">Premium Access</Link>
                        <Link href="/share" className="text-sm hover:text-white transition-colors w-fit">Share Your Story</Link>
                        <Link href="/community" className="text-sm hover:text-white transition-colors w-fit">Community</Link>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-1">
                            Company
                        </h3>
                        <Link href="/about" className="text-sm hover:text-white transition-colors w-fit">About Us</Link>
                        <Link href="/blog" className="text-sm hover:text-white transition-colors w-fit">Blog</Link>
                        <Link href="/careers" className="text-sm hover:text-white transition-colors w-fit">Careers</Link>
                        <Link href="/press" className="text-sm hover:text-white transition-colors w-fit">Press Kit</Link>
                        <Link href="/contact" className="text-sm hover:text-white transition-colors w-fit">Contact</Link>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-1">
                            Contact
                        </h3>

                        {/* Email */}
                        <div className="flex items-center gap-2.5 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 shrink-0"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            <a href="mailto:hello@wisdomshare.io" className="hover:text-white transition-colors">hello@wisdomshare.io</a>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2.5 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            <a href="tel:+8801700000000" className="hover:text-white transition-colors">+880 1700-000000</a>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-2.5 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            <span className="text-gray-400">Gulshan-2, Dhaka 1212, Bangladesh</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Copyright & Legal Section */}
                <div className="border-t border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div>
                        © 2026 WisdomShare. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;