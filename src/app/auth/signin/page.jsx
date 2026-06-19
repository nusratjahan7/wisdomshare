"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Check, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Better-Auth Google Authentication Handler
    const handleGoogleSignIn = async () => {
        const loadingToast = toast.loading("Connecting to Google...");
        try {
            setIsLoading(true);

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
                errorCallback: (error) => {
                    toast.error(error.message || "Google authentication failed.", { id: loadingToast });
                }
            });

        } catch (err) {
            toast.error("An unexpected error occurred.", { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    // Credentials Email/Password Handler
    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        const loadingToast = toast.loading("Signing you in...");
        try {
            setIsLoading(true);

            const { data, error } = await authClient.signIn.email({
                email,
                password,
                dontRedirect: true,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password.", { id: loadingToast });
                return;
            }

            if (data) {
                toast.success("Successfully logged in!", { id: loadingToast });
                router.push("/");
                router.refresh();
            }

        } catch (err) {
            console.log("❌ Server/Network Catch Error:", err);
            toast.error("Something went wrong. Please try again.", { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="w-full pt-10 min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50">
            {/* LEFT PANEL: Marketing */}
            <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-800 p-16 flex-col justify-center items-start text-white relative">
                <div className="relative z-10 max-w-md flex flex-col items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white mb-8">
                        <BookOpen size={24} />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Learn from lives lived.</h1>
                    <p className="text-purple-100/90 text-base font-light mb-10">Join a community of thoughtful people who believe that shared experience is the most powerful form of education.</p>
                    <div className="flex flex-col gap-4">
                        {["Real stories from real people", "Unlock premium wisdom content", "Share your own life lessons"].map((text, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm text-purple-50/95 font-medium">
                                <div className="w-5 h-5 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white"><Check size={12} /></div>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: Form */}
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center px-4 py-12 bg-white">
                <div className="w-full max-w-md flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[10px] text-white">📖</div>
                        <span className="text-sm font-extrabold text-slate-900">WisdomShare</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome back</h2>
                    <p className="text-sm text-slate-400 mb-8">Sign in to continue your journey.</p>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.63 14.99 1 12 1 7.37 1 3.4 3.65 1.44 7.5l3.8 2.95C6.14 7.3 8.83 5.04 12 5.04z" />
                            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.43h6.45c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.48z" />
                            <path fill="#FBBC05" d="M5.24 14.55a7.16 7.16 0 0 1 0-4.3l-3.8-2.95A11.94 11.94 0 0 0 0 12c0 1.76.38 3.44 1.44 4.95l3.8-2.95z" />
                            <path fill="#34A853" d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.66-2.84c-1.01.68-2.31 1.08-3.92 1.08-3.17 0-5.86-2.26-6.81-5.41l-3.8 2.95C3.4 20.35 7.37 23 12 23z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="w-full flex items-center justify-center my-6">
                        <div className="w-full h-px bg-slate-100" />
                        <span className="text-[11px] font-bold text-slate-400 bg-white px-3.5 uppercase absolute">or</span>
                    </div>

                    <form onSubmit={handleEmailSignIn} className="w-full flex flex-col gap-5">
                        <div className="w-full flex flex-col items-start gap-1.5">
                            <label className="text-xs font-bold text-slate-700">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-purple-500 bg-slate-50/40"
                            />
                        </div>

                        <div className="w-full flex flex-col items-start gap-1.5">
                            <label className="text-xs font-bold text-slate-700">Password</label>
                            <div className="relative w-full flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-purple-500 bg-slate-50/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-purple-600/20 transition-all disabled:opacity-50"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-8 text-xs font-medium text-slate-500">
                        Don't have an account?{" "}
                        <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700 font-bold">Create one free</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}