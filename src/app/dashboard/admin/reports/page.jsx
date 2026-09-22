"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { deleteReportedLesson, getAdminReports, ignoreReport } from "@/lib/actions/reports";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);

    const fetchReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAdminReports();
            setReports(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching reports:", err);
            setError("Failed to load reports. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleIgnore = async (lessonId) => {
        const result = await Swal.fire({
            title: "Ignore reports?",
            icon: "question",
            showCancelButton: true
        });

        if (!result.isConfirmed) return;

        try {
            await ignoreReport(lessonId);
            toast.success("Reports dismissed.");
            fetchReports();
        } catch (err) {
            console.error("Error ignoring report:", err);
            toast.error("Failed to dismiss reports. Try again.");
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        const result = await Swal.fire({
            title: "Delete Lesson?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true
        });

        if (!result.isConfirmed) return;

        try {
            await deleteReportedLesson(lessonId);
            toast.success("Lesson deleted.");
            fetchReports();
        } catch (err) {
            console.error("Error deleting lesson:", err);
            toast.error("Failed to delete lesson. Try again.");
        }
    };

    return (
        <div className="p-6 min-h-screen">

            <h1 className="text-xl font-bold mb-6">
                Reported Lessons
            </h1>

            {loading && (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-sm">
                    Loading reports...
                </div>
            )}

            {!loading && error && (
                <div className="bg-white rounded-2xl border border-red-200 p-10 text-center">
                    <p className="text-red-600 text-sm mb-3">{error}</p>
                    <button
                        onClick={fetchReports}
                        className="text-sm font-semibold text-purple-600 hover:text-purple-700"
                    >
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && reports.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-sm">
                    No reports right now. Everything looks clean.
                </div>
            )}

            {!loading && !error && reports.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden overflow-x-auto">

                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 text-left text-sm">
                                Lesson Title
                            </th>

                            <th className="p-4 text-left  text-sm">
                                Report Count
                            </th>

                            <th className="p-4 text-left  text-sm">
                                Reasons
                            </th>

                            <th className="p-4 text-left  text-sm">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {reports.map((report) => (
                            <tr
                                key={report._id}
                                className="border-t"
                            >
                                <td className="p-4 font-medium text-sm">
                                    {report.lessonTitle}
                                </td>

                                <td className="p-4">
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                        {report.reportCount}
                                    </span>
                                </td>

                                <td className="p-4">
                                    <button
                                        onClick={() =>
                                            setSelectedReport(report)
                                        }
                                        className="text-blue-600 text-sm"
                                    >
                                        View Reasons
                                    </button>
                                </td>

                                <td className="p-4">
                                    <div className="flex gap-3">

                                        <button
                                            onClick={() =>
                                                handleDeleteLesson(
                                                    report._id
                                                )
                                            }
                                            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleIgnore(
                                                    report._id
                                                )
                                            }
                                            className="bg-green-100 text-green-600 px-4 py-2 text-sm rounded-lg"
                                        >
                                            Ignore
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            )}

            {/* Modal */}

            {selectedReport && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl font-bold">
                                Report Details
                            </h2>

                            <button
                                onClick={() =>
                                    setSelectedReport(null)
                                }
                            >
                                ✕
                            </button>
                        </div>

                        {selectedReport.reports.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 mb-4"
                                >
                                    <p>
                                        <strong>Reason:</strong>{" "}
                                        {item.reason}
                                    </p>

                                    <p className="mt-2">
                                        <strong>Reporter:</strong>{" "}
                                        {item.reporterName ||
                                            "Anonymous"}
                                    </p>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;