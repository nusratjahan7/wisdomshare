import { redirect } from 'next/navigation';
import Link from 'next/link';
import LessonsClient from '@/Components/lessons/LessonsClient';
import { getLessons } from '@/lib/api/lessons';
import { getFollowingIds } from '@/lib/api/follows';
import { getUserSession } from '@/lib/core/session';

const FollowingFeedPage = async ({ searchParams }) => {
    const user = await getUserSession();
    if (!user) {
        redirect('/auth/signin');
    }

    const followingIds = await getFollowingIds();

    const filters = await searchParams;

    if (!followingIds || followingIds.length === 0) {
        return (
            <div className="pt-25 px-6 bg-background min-h-screen">
                <div className="max-w-3xl mx-auto text-center py-24">
                    <h1 className="text-3xl font-bold mb-3 text-zinc-900">Your Following Feed</h1>
                    <p className="text-zinc-500 mb-6">Follow some authors to see their lessons here.</p>
                    <Link
                        href="/lessons"
                        className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                    >
                        Browse Lessons
                    </Link>
                </div>
            </div>
        );
    }

    const querySearch = new URLSearchParams(filters);
    querySearch.set('following', followingIds.join(','));
    const queryString = querySearch.toString();

    const { lessons, total } = await getLessons(queryString);

    return (
        <div className="pt-25 px-6 bg-background min-h-screen text-white">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 py-16 px-4 mb-6 text-center rounded-2xl shadow-xl border border-violet-500/20">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                        Your Following Feed
                    </h1>
                    <p className="text-zinc-200/90 max-w-xl mx-auto text-xs md:text-sm font-medium leading-relaxed">
                        Lessons from the authors you follow.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pb-16">
                <LessonsClient
                    filters={filters}
                    lessons={lessons || []}
                    total={total || 0}
                    userPlan={user.plan || "user_free"}
                />
            </div>
        </div>
    );
};

export default FollowingFeedPage;
