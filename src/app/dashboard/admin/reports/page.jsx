"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

    const fetchReports = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/reports`
        );

        const data = await res.json();

        setReports(data);
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

        await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/reports/ignore/${lessonId}`,
            {
                method: "DELETE"
            }
        );

        fetchReports();
    };

    const handleDeleteLesson = async (lessonId) => {
        const result = await Swal.fire({
            title: "Delete Lesson?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true
        });

        if (!result.isConfirmed) return;

        await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/reports/delete-lesson/${lessonId}`,
            {
                method: "DELETE"
            }
        );

        fetchReports();
    };

    return (
        <div className="p-6 min-h-screen">

            <h1 className="text-xl font-bold mb-6">
                Reported Lessons
            </h1>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

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

            {/* Modal */}

            {selectedReport && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl w-[700px] max-h-[80vh] overflow-y-auto p-6">

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