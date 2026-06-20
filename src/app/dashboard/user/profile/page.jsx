"use client";

import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";

import toast from 'react-hot-toast';
import { serverMutation } from '@/lib/core/server';
import { getUserStats } from '@/lib/api/user';

export default function UserProfilePage() {

    const { data: session, update: updateSession } = authClient.useSession();
    const user = session?.user;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        image: ''
    });

    const [stats, setStats] = useState({
        totalLessons: 0,
        totalLikes: 0,
        totalViews: "12.8k"
    });
    const [loadingStats, setLoadingStats] = useState(true);


    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                image: user.image || '',
            });

            const fetchUserStats = async () => {
                try {
                    const userId = user.id || user._id;
                    const data = await getUserStats(userId);

                    if (data) {
                        setStats(prev => ({
                            ...prev,
                            totalLessons: data.totalLessons ?? 0,
                            totalLikes: data.totalLikes ?? 0
                        }));
                    }
                } catch (err) {
                    console.error("Failed to fetch stats:", err);
                } finally {
                    setLoadingStats(false);
                }
            };

            fetchUserStats();
        }
    }, [user, session]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Saving changes...");

        try {
            const userId = user.id || user._id;

            const response = await serverMutation(`/user/profile/update/${userId}`, {
                name: formData.name,
                bio: formData.bio,
                image: formData.image
            }, 'POST');


            if (updateSession) {
                await updateSession({
                    ...user,
                    name: formData.name,
                    bio: formData.bio,
                    image: formData.image
                });
            }

            toast.success("Profile updated successfully!", { id: loadingToast });

        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile.", { id: loadingToast });
        }
    };

    if (!user) return <div className="p-6 text-sm text-slate-500">Loading profile...</div>;

    return (
        <div className="w-full">
            {/* Title */}
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-6">My Profile</h1>

            {/* Main Profile Card */}
            <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs">

                {/* Upper Section: Avatar & Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100">
                    <img
                        src={formData.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-slate-50 shadow-inner"
                    />
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left mt-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-slate-800">{formData.name}</h2>

                            {user.plan === 'user_premium' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-600 text-white font-semibold text-[10px] uppercase rounded-full tracking-wider shadow-xs">
                                    👑 Premium
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-400 mt-0.5">{formData.email}</p>
                        <p className="text-sm text-slate-500 max-w-md mt-2 line-clamp-2">{formData.bio}</p>

                        {/* Stats Section */}
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mt-4">
                            <span className="text-purple-600 font-semibold">{loadingStats ? '...' : stats.totalLessons} Lessons</span>
                            <span>•</span>
                            <span>{loadingStats ? '...' : stats.totalLikes} Likes Received</span>
                            <span>•</span>
                            <span>{stats.totalViews} Views</span>
                        </div>
                    </div>
                </div>

                {/* Lower Section: Input Form */}
                <form onSubmit={handleProfileSubmit} className="pt-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-500">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="border border-slate-200 bg-slate-50/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                            />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-500">Email Address</label>
                            <input
                                type="email"
                                disabled
                                value={formData.email || ''}
                                className="border border-slate-200 bg-slate-50/50 text-slate-400 rounded-xl px-4 py-2.5 text-sm cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Bio */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-500">Bio</label>
                            <input
                                type="text"
                                value={formData.bio || ''}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="border border-slate-200 bg-slate-50/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                            />
                        </div>
                        {/* Photo URL */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-500">Photo URL</label>
                            <input
                                type="text"
                                value={formData.image || ''}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="border border-slate-200 bg-slate-50/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 transition-opacity shadow-sm cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}