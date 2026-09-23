import Link from 'next/link';
import { topContributor } from '@/lib/api/user';
import { Heart, BookOpen, Trophy } from 'lucide-react';

export default async function ContributorsPage() {
    const contributors = await topContributor(50);

    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Top Contributors
                    </h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        The voices behind the lessons — ranked by how many stories they&apos;ve shared.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-9">
                {contributors && contributors.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {contributors.map((person, index) => (
                            <div
                                key={person._id}
                                className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-xs flex items-center gap-4"
                            >
                                <div className="w-8 text-center font-black text-lg text-zinc-300">
                                    {index === 0 ? <Trophy className="w-6 h-6 text-amber-500 mx-auto" /> : `#${index + 1}`}
                                </div>

                                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 flex-shrink-0">
                                    {person.image ? (
                                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-bold text-zinc-500">
                                            {person.name?.[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <Link href={`/authors/${person._id}`} className="font-bold text-zinc-900 hover:text-purple-600 transition-colors">
                                        {person.name}
                                    </Link>
                                    {person.bio && <p className="text-xs text-zinc-500 truncate max-w-md">{person.bio}</p>}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-zinc-500 flex-shrink-0">
                                    <span className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4" /> {person.lessonCount}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Heart className="w-4 h-4" /> {person.totalLikes || 0}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white border border-zinc-100 rounded-2xl">
                        <p className="text-zinc-500">No contributors yet — be the first to share a lesson.</p>
                        <Link
                            href="/dashboard/user/add-lesson"
                            className="inline-block mt-4 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                        >
                            Share Your Story
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
