import Link from 'next/link';
import { BookOpen, Users2, Sparkles } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        About WisdomShare
                    </h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        A community platform where real people share the lessons that shaped their lives.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-9">
                <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-xs">
                    <h2 className="text-lg font-bold text-zinc-900 mb-3">Why we exist</h2>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                        Most of what we learn about resilience, career setbacks, relationships, and getting back up after failure doesn&apos;t come from textbooks — it comes from other people&apos;s lived experience. WisdomShare exists to give those stories a home: not polished advice columns, but honest accounts from people who actually went through it.
                    </p>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                        Every lesson on this platform was written by someone who chose to be vulnerable in public, in the hope that it might help a stranger going through something similar.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xs text-center">
                        <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-bold text-zinc-900 mb-1.5">Real stories</h3>
                        <p className="text-sm text-zinc-500">Every lesson comes from a real person&apos;s real experience, not generic advice.</p>
                    </div>
                    <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xs text-center">
                        <Users2 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-bold text-zinc-900 mb-1.5">Built together</h3>
                        <p className="text-sm text-zinc-500">Community-moderated, with reports and reviews keeping the space honest and safe.</p>
                    </div>
                    <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xs text-center">
                        <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-bold text-zinc-900 mb-1.5">Growing daily</h3>
                        <p className="text-sm text-zinc-500">New lessons, new voices, and new features — WisdomShare is actively evolving.</p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/share"
                        className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                    >
                        Share Your Story
                    </Link>
                </div>
            </div>
        </div>
    );
}
