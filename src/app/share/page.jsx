import Link from 'next/link';
import { PenLine, Sparkles, Users2, Heart } from 'lucide-react';
import { getUserSession } from '@/lib/core/session';

export default async function ShareYourStoryPage() {
    const user = await getUserSession();
    const ctaHref = user ? '/dashboard/user/add-lesson' : '/auth/signup';

    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Share Your Story
                    </h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        The lesson you learned the hard way might be exactly what someone else needs today.
                    </p>
                    <Link
                        href={ctaHref}
                        className="mt-4 mx-auto px-8 py-3 rounded-full text-sm font-bold text-indigo-700 bg-white hover:bg-zinc-100 transition-colors w-fit shadow-lg"
                    >
                        Write Your First Lesson
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xs">
                        <PenLine className="w-8 h-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-zinc-900 mb-1.5">Write freely</h3>
                        <p className="text-sm text-zinc-500">Title, a short description, and the full story — that&apos;s all it takes. No formatting rules, just your voice.</p>
                    </div>
                    <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xs">
                        <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-zinc-900 mb-1.5">Get AI help</h3>
                        <p className="text-sm text-zinc-500">Stuck on a title or want your draft tightened up? The built-in AI assistant can help while you write.</p>
                    </div>
                    <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xs">
                        <Users2 className="w-8 h-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-zinc-900 mb-1.5">Reach real readers</h3>
                        <p className="text-sm text-zinc-500">Your lesson shows up in the community feed, can be liked, saved, and commented on, and followers get notified.</p>
                    </div>
                </div>

                <div className="mt-10 bg-white border border-zinc-100 rounded-2xl p-8 text-center">
                    <Heart className="w-8 h-8 text-fuchsia-500 mx-auto mb-3" />
                    <h2 className="text-lg font-bold text-zinc-900 mb-2">Every story has value</h2>
                    <p className="text-sm text-zinc-500 max-w-xl mx-auto">
                        You don&apos;t need a dramatic turning point or a perfect ending. The small, honest lessons — about work, relationships, mistakes, habits — are often the ones that resonate most.
                    </p>
                    <Link
                        href={ctaHref}
                        className="inline-block mt-6 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}
