"use client";

import React, { useEffect, useState } from "react";
import {
    Eye,
    Trash2,
    Star,
    CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

const Moderation = () => {
    const [lessons, setLessons] = useState([]);
    const [filteredLessons, setFilteredLessons] = useState([]);

    const [categoryFilter, setCategoryFilter] = useState("all");
    const [accessFilter, setAccessFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/lessons`
            );

            const data = await res.json();

            setLessons(data);
            setFilteredLessons(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let result = [...lessons];

        if (categoryFilter !== "all") {
            result = result.filter(
                (lesson) => lesson.category === categoryFilter
            );
        }

        if (accessFilter !== "all") {
            result = result.filter(
                (lesson) => lesson.access === accessFilter
            );
        }

        if (statusFilter !== "all") {
            result = result.filter(
                (lesson) => lesson.status === statusFilter
            );
        }

        setFilteredLessons(result);
    }, [
        categoryFilter,
        accessFilter,
        statusFilter,
        lessons,
    ]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Lesson?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Delete",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/lessons/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted Successfully",
                    timer: 1500,
                    showConfirmButton: false,
                });

                fetchLessons();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFeatured = async (lesson) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/lessons/featured/${lesson._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...lesson,
                        isFeatured: !lesson.isFeatured,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: lesson.isFeatured
                        ? "Removed From Featured"
                        : "Added To Featured",
                    timer: 1500,
                    showConfirmButton: false,
                });

                fetchLessons();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleReview = async (id) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/lessons/reviewed/${id}`,
                {
                    method: "PATCH",
                }
            );

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Marked As Reviewed",
                    timer: 1500,
                    showConfirmButton: false,
                });

                fetchLessons();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* Header */}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Lesson Moderation
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage all lessons created by users
                    </p>
                </div>

                <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
                    <span className="text-slate-600 font-medium">
                        {filteredLessons.length} Total Lessons
                    </span>
                </div>
            </div>

            {/* Filters */}

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <select
                    value={categoryFilter}
                    onChange={(e) =>
                        setCategoryFilter(e.target.value)
                    }
                    className="bg-white border border-slate-200 rounded-xl p-3 text-slate-700 shadow-sm"
                >
                    <option value="all">All Categories</option>
                    <option value="Career">Career</option>
                    <option value="Mindfulness">
                        Mindfulness
                    </option>
                    <option value="Relationships">
                        Relationships
                    </option>
                    <option value="Purpose">Purpose</option>
                </select>

                <select
                    value={accessFilter}
                    onChange={(e) =>
                        setAccessFilter(e.target.value)
                    }
                    className="bg-white border border-slate-200 rounded-xl p-3 text-slate-700 shadow-sm"
                >
                    <option value="all">All Access</option>
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="bg-white border border-slate-200 rounded-xl p-3 text-slate-700 shadow-sm"
                >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                </select>
            </div>

            {/* Table */}

            <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="text-left px-6 py-4 text-slate-700 font-semibold">
                                Lesson
                            </th>

                            <th className="text-left px-6 py-4 text-slate-700 font-semibold">
                                Author
                            </th>

                            <th className="text-left px-6 py-4 text-slate-700 font-semibold">
                                Category
                            </th>

                            <th className="text-left px-6 py-4 text-slate-700 font-semibold">
                                Access
                            </th>

                            <th className="text-left px-6 py-4 text-slate-700 font-semibold">
                                Status
                            </th>

                            <th className="text-left px-6 py-4 text-slate-700 font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredLessons.map((lesson) => (
                            <tr
                                key={lesson._id}
                                className="border-t border-slate-100 hover:bg-slate-50 transition"
                            >
                                {/* Lesson */}

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={
                                                lesson.image ||
                                                "https://via.placeholder.com/60"
                                            }
                                            alt={lesson.title}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />

                                        <div>
                                            <h3 className="font-semibold text-slate-800 text-sm">
                                                {lesson.title}
                                            </h3>

                                            <p className="text-[11px] text-slate-500">
                                                {new Date(
                                                    lesson.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Author */}

                                <td className="pl-8 py-4  text-slate-700 text-sm">
                                    {lesson.username}
                                </td>

                                {/* Category */}

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[12px] font-medium">
                                        {lesson.category}
                                    </span>
                                </td>

                                {/* Access */}

                                <td className="px-6 py-4">
                                    {lesson.access === "Premium" ? (
                                        <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-[12px] font-medium">
                                            Premium
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[12px] font-medium">
                                            Free
                                        </span>
                                    )}
                                </td>

                                {/* Status */}

                                <td className="px-6 py-4">
                                    {lesson.status ===
                                        "Reviewed" ? (
                                        <span className="text-green-600 font-semibold text-[12px]">
                                            Reviewed
                                        </span>
                                    ) : (
                                        <span className="text-orange-500 font-semibold text-[12px]">
                                            Pending
                                        </span>
                                    )}
                                </td>

                                {/* Actions */}

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="text-sky-500 hover:text-sky-700"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleFeatured(lesson)
                                            }
                                            className={
                                                lesson.isFeatured
                                                    ? "text-amber-500"
                                                    : "text-slate-400"
                                            }
                                        >
                                            <Star
                                                size={18}
                                                fill={
                                                    lesson.isFeatured
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                            />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleReview(
                                                    lesson._id
                                                )
                                            }
                                            className="text-green-500 hover:text-green-700"
                                        >
                                            <CheckCircle size={18} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    lesson._id
                                                )
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredLessons.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-10 text-slate-500"
                                >
                                    No lessons found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Moderation;