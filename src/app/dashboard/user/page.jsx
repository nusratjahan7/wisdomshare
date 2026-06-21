"use client";

import { getUserDashboard } from '@/lib/api/user';
import { authClient } from '@/lib/auth-client';
import { Bookmark, BookOpen, Eye, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [stats, setStats] = useState({
        totalLessons: 0,
        totalLikes: 0,
        totalSaves: 0,
        graphData: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboardData = async () => {
            if (!user?.id) return;

            try {

                const data = await getUserDashboard(user.id);
                if (data) {
                    setStats(data);
                }
            } catch (err) {
                console.error("Error loading dashboard stats:", err);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [user]);

    if (loading) return <p className="text-center p-10">Loading Dashboard...</p>;

    return (
        <div className="  min-h-screen">
            <h1 className="text-2xl font-bold text-zinc-900">Welcome back, {user?.name || " "} 👋</h1>
            <p className="text-zinc-500 text-xs mt-1">Here's how your content is performing this month.</p>


            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

                <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-xs flex flex-col justify-between">
                    <div>
                        <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600 inline-flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                        </span>
                        <h2 className="text-2xl font-bold text-zinc-900 mt-3">{stats.totalLessons}</h2>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-medium mt-1">Lessons Created</p>
                </div>

                {/* Total Views */}
                <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-xs flex flex-col justify-between">
                    <div>
                        <span className="p-2 rounded-lg bg-purple-50 text-purple-600 inline-flex items-center justify-center">
                            <Eye className="w-4 h-4" />
                        </span>
                        <h2 className="text-2xl font-bold text-zinc-900 mt-3">423</h2>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-medium mt-1">Total Views</p>
                </div>

                {/* Total Likes */}
                <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-xs flex flex-col justify-between">
                    <div>
                        <span className="p-2 rounded-lg bg-rose-50 text-rose-500 inline-flex items-center justify-center">
                            <Heart className="w-4 h-4" />
                        </span>
                        <h2 className="text-2xl font-bold text-zinc-900 mt-3">{stats.totalLikes}</h2>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-medium mt-1">Total Likes</p>
                </div>

                {/* Favorites Saved */}
                <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-xs flex flex-col justify-between">
                    <div>
                        <span className="p-2 rounded-lg bg-amber-50 text-amber-500 inline-flex items-center justify-center">
                            <Bookmark className="w-4 h-4" />
                        </span>
                        <h2 className="text-2xl font-bold text-zinc-900 mt-3">{stats.totalSaves}</h2>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-medium mt-1">Favorites Saved</p>
                </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 mt-6 shadow-xs">
                <h3 className="text-sm font-bold text-zinc-900 mb-4">Activity — Lessons & Likes</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                            <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                            <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="likes" stroke="#8b5cf6" fillOpacity={0.05} fill="#8b5cf6" strokeWidth={2} />
                            <Area type="monotone" dataKey="lessons" stroke="#6366f1" fillOpacity={0.01} fill="#6366f1" strokeWidth={1.5} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}