import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Bookmark } from 'lucide-react';
import { getUserSession } from '@/lib/core/session';
import { getSavedLessons } from '@/lib/api/lessons';
import LessonCard from '@/Components/lessons/LessonCard';

export default async function MyFavoritesPage() {

    const user = await getUserSession();
    const userId = user?.id || user?._id;

    if (!userId) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
                <p className="text-gray-600 font-medium">Please log in to view your favorite lessons.</p>
            </div>
        );
    }


    const savedLessons = await getSavedLessons(userId);

    return (
        <div className="min-h-screen ">

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">My Favorites</h1>
                <p className="text-zinc-500 mt-1 text-sm">Lessons you've saved to return to.</p>
            </div>


            {savedLessons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-200 rounded-2xl bg-white">
                    <Bookmark className="w-12 h-12 text-zinc-300 mb-3" />
                    <p className="text-zinc-500 font-medium text-sm">No saved lessons found.</p>
                </div>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedLessons.map((lesson) => (
                        <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                            userPlan={user?.plan}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}