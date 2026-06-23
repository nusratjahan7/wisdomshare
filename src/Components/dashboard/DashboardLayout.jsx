"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    PlusCircle,
    FileText,
    Bookmark,
    User,
    LogOut,
    Menu,
    X,
    BarChart3,
    Users,
    ShieldAlert,
    AlertTriangle,
    BookOpen
} from 'lucide-react';

export default function DashboardLayout({ children, userRole = "user" }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuConfig = {
        user: [
            { label: 'Overview', path: '/dashboard/user', icon: LayoutDashboard },
            { label: 'Add Lesson', path: '/dashboard/user/add-lesson', icon: PlusCircle },
            { label: 'My Lessons', path: '/dashboard/user/my-lessons', icon: FileText },
            { label: 'My Favorites', path: '/dashboard/user/favorites', icon: Bookmark },
            { label: 'Profile', path: '/dashboard/user/profile', icon: User },
        ],
        admin: [
            { label: 'Analytics', path: '/dashboard/admin', icon: BarChart3 },
            { label: 'User Management', path: '/dashboard/admin/users', icon: Users },
            { label: 'Lesson Moderation', path: '/dashboard/admin/moderation', icon: ShieldAlert },
            { label: 'Reported Content', path: '/dashboard/admin/reports', icon: AlertTriangle },
            { label: 'Profile', path: '/dashboard/admin/profile', icon: User },
        ]
    };

    const navItems = menuConfig[userRole] || menuConfig['user'];

    const MenuContent = () => (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm w-full">
            {/* Header / Brand Title */}
            <div className="flex items-center gap-3 pb-5 border-b border-slate-100 mb-6">
                <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                    <BookOpen size={18} />
                </div>
                <span className="font-bold text-slate-800 text-base tracking-tight">My Dashboard</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5 mb-6">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${isActive
                                ? 'bg-indigo-50/70 text-indigo-600'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                        >
                            <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Exit Action Button */}
            <div className="pt-4 border-t border-slate-100">
                <Link
                    href="/"
                    className="flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors w-full"
                >
                    <LogOut size={18} />
                    <span>Exit Dashboard</span>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8f9fd] text-slate-800 antialiased p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">


                <div className="lg:hidden col-span-1 w-full flex flex-col gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-full bg-white rounded-full border border-slate-100 px-5 py-3.5 flex items-center gap-3 shadow-sm hover:bg-slate-50 transition-colors text-left"
                    >
                        {isMobileMenuOpen ? <X size={18} className="text-slate-600" /> : <Menu size={18} className="text-slate-600" />}
                        <span className="text-sm font-bold text-slate-800">Menu</span>
                    </button>


                    {isMobileMenuOpen && (
                        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-200">
                            <MenuContent />
                        </div>
                    )}
                </div>


                <aside className="hidden lg:block lg:col-span-3 sticky top-8 w-full">
                    <MenuContent />
                </aside>

                {/* DYNAMIC DASHBOARD MAIN CONTENT ROUTE */}
                <main className="col-span-1 lg:col-span-9 w-full bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm min-h-[70vh]">
                    {children}
                </main>

            </div>
        </div>
    );
}