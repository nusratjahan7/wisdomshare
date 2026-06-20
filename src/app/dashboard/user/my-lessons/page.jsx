"use client";

import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { serverMutation } from "@/lib/core/server";
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiHeart, FiBookmark } from "react-icons/fi";
import toast from 'react-hot-toast';
import Link from 'next/link';
import { getMyLessons } from '@/lib/api/lessons';

export default function MyLessonsPage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);


    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState(null);


    const loadLessons = async () => {
        if (user?.id || user?._id) {
            try {
                const userId = user.id || user._id;
                const data = await getMyLessons(userId);
                setLessons(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadLessons();
    }, [user]);


    const handleDeleteClick = (id) => {
        setSelectedLessonId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedLessonId) return;
        const loadingToast = toast.loading("Deleting lesson...");

        try {
            const targetId = selectedLessonId.$oid || selectedLessonId;
            await serverMutation(`/lessons/delete/${targetId}`, {}, 'DELETE');
            toast.success("Lesson deleted successfully!", { id: loadingToast });
            setIsDeleteModalOpen(false);
            loadLessons();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete lesson.", { id: loadingToast });
        }
    };


    const handleEditClick = (lesson) => {
        setEditFormData({ ...lesson });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Updating lesson...");

        try {
            const targetId = editFormData._id.$oid || editFormData._id;
            const { _id, ...cleanData } = editFormData;
            await serverMutation(`/lessons/update/${targetId}`, cleanData, 'POST');
            toast.success("Lesson updated successfully!", { id: loadingToast });
            setIsEditModalOpen(false);
            loadLessons();
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update lesson. Check console.", { id: loadingToast });
        }
    };

    if (loading) return <div className="p-6 text-sm text-slate-500">Loading your dashboard...</div>;

    return (
        <div className="w-full">
            {/* Header section matching image */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Lessons</h1>
                <Link href="/dashboard/user/add-lesson" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity shadow-xs">
                    <FiPlus className="w-4 h-4" /> Add New
                </Link>
            </div>

            {/* Table Container */}
            <div className="w-full bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-semibold text-xs tracking-wider uppercase bg-slate-50/50">
                                <th className="py-4 px-6">Title</th>
                                <th className="py-4 px-6">Category</th>
                                <th className="py-4 px-6">Stats</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {lessons.map((lesson) => (
                                <tr key={lesson._id} className="hover:bg-slate-50/40 transition-colors">
                                    {/* Title with Image and Date */}
                                    <td className="py-4 px-6 max-w-xs">
                                        <div className="flex items-center gap-3">
                                            <img src={lesson.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'} alt="" className="w-11 h-11 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-bold text-slate-800 line-clamp-1">{lesson.title}</h3>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jun 10, 2026'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category Chip */}
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-600 font-medium text-xs rounded-full border border-purple-100/50">
                                            <span className="w-1 h-1 rounded-full bg-purple-500 mr-0.5"></span>
                                            {lesson.category}
                                        </span>
                                    </td>

                                    {/* Dummy Stats for layout matching */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3 text-slate-400 text-xs">
                                            <span className="flex items-center gap-1"><FiEye /> 2,841</span>
                                            <span className="flex items-center gap-1"><FiHeart /> 189</span>
                                            <span className="flex items-center gap-1"><FiBookmark /> 342</span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 font-semibold text-xs rounded-full border border-emerald-100">
                                            ✓ Published
                                        </span>
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <button onClick={() => handleEditClick(lesson)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteClick(lesson._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {lessons.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-10 text-center text-slate-400">No lessons found. Add your first lesson today!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= DELETE CONFIRMATION MODAL ================= */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-slate-100 shadow-xl">
                        <h3 className="text-lg font-bold text-slate-800">Delete Lesson?</h3>
                        <p className="text-sm text-slate-500 mt-2">Are you sure you want to delete this lesson? This action cannot be undone.</p>
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2 rounded-full text-sm font-semibold text-slate-500 hover:bg-slate-50 border border-slate-200">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= EDIT MODAL OPTIONS ================= */}
            {isEditModalOpen && editFormData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs overflow-y-auto p-4">
                    <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl border border-slate-100 shadow-xl my-8">
                        <h3 className="text-xl font-bold text-slate-800 mb-5">Edit Lesson</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-slate-600">Lesson Title</label>
                                    <input type="text" required value={editFormData.title} onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })} className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-slate-600">Subtitle</label>
                                    <input type="text" value={editFormData.subtitle || ''} onChange={(e) => setEditFormData({ ...editFormData, subtitle: e.target.value })} className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-slate-600">Category</label>
                                    <select value={editFormData.category} onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-purple-500">
                                        <option value="Resilience">Resilience</option>
                                        <option value="Career">Career</option>
                                        <option value="Mindset">Mindset</option>
                                        <option value="Relationships">Relationships</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-slate-600">Emotional Tone</label>
                                    <select value={editFormData.emotionalTone} onChange={(e) => setEditFormData({ ...editFormData, emotionalTone: e.target.value })} className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-purple-500">
                                        <option value="Reflective">Reflective</option>
                                        <option value="Motivating">Motivating</option>
                                        <option value="Humorous">Humorous</option>
                                        <option value="Serious">Serious</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-slate-600">Short Description</label>
                                <input type="text" required value={editFormData.shortDescription} onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })} className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-slate-600">Full Content</label>
                                <textarea rows={5} required value={editFormData.content} onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })} className="border border-slate-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 resize-none" />
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2 rounded-full text-sm font-semibold text-slate-500 hover:bg-slate-50 border border-slate-200">
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}