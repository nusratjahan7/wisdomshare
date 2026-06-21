"use client"
import React, { useEffect, useState } from 'react';
import { Users, BookOpen, Crown, Flag } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

        // এখানে ইউআরএল-টি একদম ক্লিন রাখা হয়েছে
        fetch(`${backendUrl}/api/admin/analytics-overview`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setAnalyticsData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading admin stats:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-slate-500 font-medium">
                Loading dashboard data...
            </div>
        );
    }

    const cards = analyticsData?.cards || { totalUsers: 0, publishedLessons: 0, premiumMembers: 0, reportedContent: 0 };
    const growthChartData = analyticsData?.growthChartData || [];
    const categoryData = analyticsData?.lessonsByCategory || [];

    const COLORS = {
        'Resilience': '#6366F1',
        'Relationships': '#A855F7',
        'Purpose': '#06B6D4',
        'Courage': '#10B981',
        'Mindfulness': '#F59E0B',
        'Other': '#EC4899'
    };

    return (
        <div className="p-6 bg-[#F8FAFC] min-h-screen font-sans">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Platform Analytics</h1>

            {/* STATS CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Users */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <Users size={22} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
                            +12%
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{cards.totalUsers.toLocaleString()}</h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">Total Users</p>
                </div>

                {/* Published Lessons */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <BookOpen size={22} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
                            +8%
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{cards.publishedLessons.toLocaleString()}</h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">Published Lessons</p>
                </div>

                {/* Premium Members */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <Crown size={22} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
                            +23%
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{cards.premiumMembers.toLocaleString()}</h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">Premium Members</p>
                </div>

                {/* Reported Content */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                            <Flag size={22} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 bg-rose-50 text-rose-600 rounded-full flex items-center gap-1">
                            -3
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{cards.reportedContent.toLocaleString()}</h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">Reported Content</p>
                </div>
            </div>

            {/* GRAPHS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Platform Growth */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">Platform Growth</h2>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0.01} />
                                    </linearGradient>
                                    <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.01} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                <Area name="Users" type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                                <Area name="Lessons" type="monotone" dataKey="lessons" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorLessons)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Lessons by Category</h2>
                        <div className="h-56 relative flex justify-center items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={3}
                                        dataKey="count"
                                        nameKey="category"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.category] || COLORS['Other']} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-y-2 gap-x-1 mt-4 border-t border-slate-50 pt-4">
                        {categoryData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS[entry.category] || COLORS['Other'] }} />
                                <span className="text-xs font-semibold text-slate-600 truncate">{entry.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;