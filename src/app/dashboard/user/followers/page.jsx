import Link from 'next/link';
import { Users } from 'lucide-react';
import { getUserSession } from '@/lib/core/session';
import { getMyFollowers, getMyFollowing } from '@/lib/api/follows';
import FollowButton from '@/Components/shared/FollowButton';

const UserRow = ({ person, isFollowing, isLoggedIn }) => (
    <div className="flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-zinc-50 transition-colors">
        <Link href={`/authors/${person._id}`} className="flex items-center gap-3 min-w-0 group">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-zinc-200 flex-shrink-0">
                {person.image ? (
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-zinc-500">
                        {person.name?.[0]?.toUpperCase()}
                    </div>
                )}
            </div>
            <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 group-hover:text-purple-600 transition-colors truncate">
                    {person.name}
                </p>
                {person.bio && <p className="text-xs text-zinc-500 truncate max-w-xs">{person.bio}</p>}
            </div>
        </Link>
        <FollowButton authorId={person._id} initialIsFollowing={isFollowing} isLoggedIn={isLoggedIn} compact />
    </div>
);

export default async function FollowersPage() {
    const user = await getUserSession();

    if (!user) {
        return (
            <div className="min-h-screen">
                <p className="text-zinc-600 font-medium">Please log in to view your followers and following.</p>
            </div>
        );
    }

    const [followers, following] = await Promise.all([
        getMyFollowers(),
        getMyFollowing(),
    ]);

    const followingIds = new Set((following || []).map((f) => f._id));

    return (
        <div className="min-h-screen">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Followers & Following</h1>
                <p className="text-zinc-500 mt-1 text-sm">People who follow you, and people you follow.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-sm font-bold text-zinc-700 uppercase tracking-wide mb-3">
                        Followers <span className="text-zinc-400 font-medium normal-case">({followers?.length || 0})</span>
                    </h2>
                    {followers && followers.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            {followers.map((person) => (
                                <UserRow
                                    key={person._id}
                                    person={person}
                                    isFollowing={followingIds.has(person._id)}
                                    isLoggedIn={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-zinc-200 rounded-2xl bg-white">
                            <Users className="w-10 h-10 text-zinc-300 mb-2" />
                            <p className="text-zinc-500 text-sm font-medium">No followers yet.</p>
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-sm font-bold text-zinc-700 uppercase tracking-wide mb-3">
                        Following <span className="text-zinc-400 font-medium normal-case">({following?.length || 0})</span>
                    </h2>
                    {following && following.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            {following.map((person) => (
                                <UserRow
                                    key={person._id}
                                    person={person}
                                    isFollowing={true}
                                    isLoggedIn={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-zinc-200 rounded-2xl bg-white">
                            <Users className="w-10 h-10 text-zinc-300 mb-2" />
                            <p className="text-zinc-500 text-sm font-medium">You&apos;re not following anyone yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
