import Link from 'next/link';
import LessonCard from '@/Components/lessons/LessonCard';
import FollowButton from '@/Components/shared/FollowButton';
import { getLessons } from '@/lib/api/lessons';
import { getFollowCounts, getFollowStatus, getPublicUser } from '@/lib/api/follows';
import { getUserSession } from '@/lib/core/session';

const AuthorProfilePage = async ({ params }) => {
    const { id } = await params;

    const currentUser = await getUserSession();

    const [author, counts, { lessons }] = await Promise.all([
        getPublicUser(id),
        getFollowCounts(id),
        getLessons(new URLSearchParams({ userId: id }).toString()),
    ]);

    const isFollowing = currentUser
        ? (await getFollowStatus(id))?.isFollowing || false
        : false;

    if (!author || author.error) {
        return (
            <div className="pt-25 px-6 min-h-screen text-center">
                <p className="text-zinc-500">Author not found.</p>
            </div>
        );
    }

    return (
        <div className="pt-25 px-6 bg-background min-h-screen">
            <div className="max-w-4xl mx-auto pb-16">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-zinc-200 pb-8 mb-8">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-800 border border-zinc-200 flex-shrink-0">
                        {author.image ? (
                            <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-xl text-zinc-300">
                                {author.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-zinc-900">{author.name}</h1>
                        {author.bio && <p className="text-zinc-500 text-sm mt-1 max-w-xl">{author.bio}</p>}

                        <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-zinc-600">
                            <span><strong className="text-zinc-900">{counts?.followers || 0}</strong> followers</span>
                            <span><strong className="text-zinc-900">{counts?.following || 0}</strong> following</span>
                        </div>
                    </div>

                    {currentUser && currentUser.id !== id && (
                        <FollowButton authorId={id} initialIsFollowing={isFollowing} isLoggedIn={!!currentUser} />
                    )}
                </div>

                <h2 className="text-lg font-bold mb-4 text-zinc-900">Lessons by {author.name}</h2>
                {lessons && lessons.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson) => (
                            <LessonCard
                                key={lesson._id}
                                lesson={lesson}
                                userPlan={currentUser?.plan || "user_free"}
                                isLoggedIn={!!currentUser}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-zinc-500 text-sm">No lessons published yet.</p>
                )}
            </div>
        </div>
    );
};

export default AuthorProfilePage;
