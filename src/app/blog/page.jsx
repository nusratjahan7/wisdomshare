import Link from 'next/link';
import { Newspaper } from 'lucide-react';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Blog</h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        Updates, deep dives, and stories from behind the scenes at WisdomShare.
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 mt-9">
                <div className="bg-white border border-zinc-100 rounded-2xl p-12 text-center shadow-xs">
                    <Newspaper className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-zinc-900 mb-2">Coming soon</h2>
                    <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
                        We&apos;re just getting started — the blog isn&apos;t live yet. In the meantime, the best stories are already here, written by our community.
                    </p>
                    <Link
                        href="/lessons"
                        className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                    >
                        Browse Lessons Instead
                    </Link>
                </div>
            </div>
        </div>
    );
}
