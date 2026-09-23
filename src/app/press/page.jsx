import Image from 'next/image';
import { Newspaper, Mail } from 'lucide-react';

export default function PressPage() {
    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Press Kit</h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        Brand assets and information for journalists and partners.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-9 flex flex-col gap-6">
                <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-xs">
                    <h2 className="text-lg font-bold text-zinc-900 mb-4">Logo</h2>
                    <div className="w-48 h-24 relative bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-center">
                        <Image src="/assets/logo.png" alt="WisdomShare Logo" fill className="object-contain p-4" />
                    </div>
                </div>

                <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-xs">
                    <h2 className="text-lg font-bold text-zinc-900 mb-3">About WisdomShare</h2>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                        WisdomShare is a community platform where people share the personal lessons that shaped who they are — from career setbacks to hard-won mindset shifts. Readers browse free and premium lessons, follow authors whose stories resonate with them, and engage through likes, comments, and replies.
                    </p>
                </div>

                <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-xs text-center">
                    <Newspaper className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <h2 className="text-lg font-bold text-zinc-900 mb-2">Press inquiries</h2>
                    <p className="text-sm text-zinc-500 mb-5">
                        For interviews, quotes, or additional assets, reach out directly.
                    </p>
                    <a
                        href="mailto:hello@wisdomshare.io"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                    >
                        <Mail className="w-4 h-4" /> hello@wisdomshare.io
                    </a>
                </div>
            </div>
        </div>
    );
}
