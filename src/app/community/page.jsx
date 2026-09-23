import Link from 'next/link';
import { HeartHandshake, ShieldCheck, MessageCircleHeart, Ban } from 'lucide-react';

const guidelines = [
    {
        icon: HeartHandshake,
        title: 'Be honest',
        text: "The best lessons come from real experience. Write about what actually happened, not what sounds impressive.",
    },
    {
        icon: MessageCircleHeart,
        title: 'Be kind in comments',
        text: 'Someone shared something personal. Respond the way you\'d want a stranger to respond to your own story.',
    },
    {
        icon: ShieldCheck,
        title: 'Protect privacy',
        text: "Feel free to change names or details to protect people in your story — the lesson matters more than the specifics.",
    },
    {
        icon: Ban,
        title: 'No harassment or spam',
        text: 'Content that harasses others, spreads misinformation, or exists purely to promote something will be removed. Use the report button if you see it.',
    },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Community
                    </h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        WisdomShare works because people show up honestly. Here&apos;s how we keep it that way.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {guidelines.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xs">
                            <Icon className="w-8 h-8 text-purple-600 mb-3" />
                            <h3 className="font-bold text-zinc-900 mb-1.5">{title}</h3>
                            <p className="text-sm text-zinc-500">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 bg-white border border-zinc-100 rounded-2xl p-8 text-center">
                    <h2 className="text-lg font-bold text-zinc-900 mb-2">Follow authors, not just posts</h2>
                    <p className="text-sm text-zinc-500 max-w-xl mx-auto mb-5">
                        Found someone whose lessons resonate with you? Follow them from their profile or any of their comments to see their new lessons in your Following feed.
                    </p>
                    <Link
                        href="/lessons"
                        className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                    >
                        Explore Lessons
                    </Link>
                </div>
            </div>
        </div>
    );
}
