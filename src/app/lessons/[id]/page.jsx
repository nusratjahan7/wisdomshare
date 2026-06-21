"use client"
import React, { useState, useEffect } from 'react';
import { checkSaveStatus, getComments, getLessonDetails, getRelatedLessons } from '@/lib/api/lessons';
import { postComment, saveLesson, submitReport, toggleLikeLesson } from '@/lib/actions/createLesson';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function LessonDetailsPage() {
    const { id } = useParams(); // এটিই আমাদের lessonId
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [lesson, setLesson] = useState(null);
    const [comments, setComments] = useState([]);
    const [relatedLessons, setRelatedLessons] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    // Modal & Reporting State
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportText, setReportText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!id) return;

        // Fetch primary payload data structures
        getLessonDetails(id).then(data => {
            setLesson(data);
            setLikesCount(data.totalLikes || 0);
            if (user) {
                setHasLiked(data.likedBy?.includes(user.id) || false);
            }

            // Get category-matched recommendations
            getRelatedLessons(data.category, id).then(res => setRelatedLessons(res));
        });

        // Fetch comments
        getComments(id).then(res => setComments(res));

        // Fetch active save status tracking indicators
        if (user) {
            checkSaveStatus(id, user.id).then(res => setIsSaved(res.isSaved));
        }
    }, [id, user?.id]);

    const handleLike = async () => {
        if (!user) return toast("Please log in to like this lesson.");
        try {
            const res = await toggleLikeLesson(id, user.id);
            if (res.success) {
                setHasLiked(res.liked);
                setLikesCount(res.totalLikes);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        if (!user) return toast("Please log in to save this lesson.");
        try {
            // Pass user.plan to validate 5 item ceilings on backend
            const res = await saveLesson(id, user.id, user.plan);
            if (res.success) {
                setIsSaved(true);
                toast.success("Lesson saved successfully!");
            } else {
                toast(res.message);
            }
        } catch (err) {
            toast.error(err.message || "Failed to save lesson");
        }
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        if (!reportText.trim()) return;

        try {
            const reportPayload = {
                lessonId: id,
                lessonTitle: lesson.title,
                reporterId: user?.id || "anonymous",
                reporterName: user?.name || "Anonymous",
                reason: reportText,
            };
            const res = await submitReport(reportPayload);
            if (res.success) {
                alert("Thank you. Report filed successfully.");
                setIsReportModalOpen(false);
                setReportText('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        if (!user) return toast.error("Please log in to post a comment.");

        const newCommentPayload = {
            text: newComment,
            username: user.username || user.name || "Anonymous",
            lessonId: id,
        };

        try {
            const result = await postComment(newCommentPayload);

            if (result && (result.success !== false)) {

                const optimisticComment = {
                    ...newCommentPayload,
                    createdAt: result.createdAt || new Date().toISOString()
                };

                setComments((prevComments) => [optimisticComment, ...prevComments]);
                setNewComment("");
                toast.success("Comment posted successfully!");
            } else {
                toast.error(result?.message || "Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error("Something went wrong");
        }
    };

    if (!lesson) return <div className="text-center py-20 text-gray-500">Loading lesson details...</div>;

    return (
        <div className="max-w-4xl mx-auto pt-10 px-4 pb-8 text-gray-800">
            {/* Header metadata layer */}
            <div className="mb-4 text-xs font-semibold tracking-wide uppercase flex gap-2">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded">{lesson.category}</span>
                <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded">{lesson.emotionalTone}</span>
                {lesson.accessType === 'Premium' && <span className="bg-yellow-500 text-white px-2.5 py-1 rounded">⭐ Premium</span>}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{lesson.subtitle}</p>

            <div className="flex items-center gap-3 mb-6 border-b pb-4 border-gray-100">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    {lesson.userImage ? <img src={lesson.userImage} alt={lesson.username} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">{lesson.username?.[0]?.toUpperCase()}</div>}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">{lesson.username}</p>
                    <p className="text-xs text-gray-400">
                        {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : ''}
                    </p>
                </div>
            </div>

            {/* Display Hero Banner */}
            {lesson.image && (
                <div className="w-full h-96 rounded-xl overflow-hidden mb-8">
                    <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Content view markup */}
            <article className="prose max-w-none text-lg leading-relaxed text-gray-700 mb-12">
                {lesson.content}
            </article>

            {/* Action Bar controls element */}
            <div className="flex items-center justify-between border-t border-b py-4 my-8 border-gray-200">
                <div className="flex items-center gap-4">
                    {/* Like Button */}
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${hasLiked
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : 'hover:bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={hasLiked ? "currentColor" : "none"}
                            stroke="currentColor"
                            className="w-4 h-4"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <span>{likesCount} Likes</span>
                    </button>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={isSaved}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${isSaved
                            ? 'bg-green-50 text-green-600 border-green-200 cursor-not-allowed'
                            : 'hover:bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={isSaved ? "currentColor" : "none"}
                            stroke="currentColor"
                            className="w-4 h-4"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                        <span>{isSaved ? 'Saved' : 'Save Lesson'}</span>
                    </button>
                </div>

                {/* Report Button */}
                <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 font-medium transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.731a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                    </svg>
                    Report Lesson
                </button>
            </div>

            {/* Comments Framework Interface */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">💬 Comments <span className="text-base font-normal text-gray-400">({comments.length})</span></h3>

                <form onSubmit={handleCommentSubmit} className="mb-8">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts or how this lesson resonated with you..."
                        className="w-full border rounded-xl p-4 min-h-[100px] shadow-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <div className="flex justify-end mt-2">
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-lg transition text-sm">Post Comment</button>
                    </div>
                </form>

                <div className="space-y-4">
                    {comments.map((comment, index) => {
                        // ডেট ফিল্ড ডিফেন্সিভ পার্সিং লজিক
                        const commentDate = comment.createdAt ? new Date(comment.createdAt) : new Date();
                        const isValidDate = !isNaN(commentDate.getTime());

                        return (
                            <div
                                key={index}
                                className="p-4 border rounded-xl border-gray-100 bg-gray-50/50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-sm">{comment.username}</span>
                                    <span className="text-xs text-gray-400">
                                        {isValidDate ? commentDate.toLocaleDateString() : 'Just now'}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm whitespace-pre-line">{comment.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Related Lessons Layout Block */}
            {relatedLessons.length > 0 && (
                <section className="border-t pt-12 border-gray-200">
                    <h3 className="text-2xl font-bold mb-6">Related Lessons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedLessons.map((item) => (
                            <Link href={`/lessons/${item._id}`} key={item._id} className="group flex flex-col border rounded-xl overflow-hidden hover:shadow-lg transition bg-white border-gray-100">
                                <div className="h-40 w-full bg-gray-100 overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <span className="text-xs font-semibold text-purple-600 mb-1">{item.category}</span>
                                    <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition mb-1 line-clamp-1">{item.title}</h4>
                                    <p className="text-xs text-gray-500 line-clamp-2 flex-grow">{item.shortDescription}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Report Modal System Markup */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl transform transition-all scale-100 mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Report Lesson</h3>
                            <button onClick={() => setIsReportModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-semibold">&times;</button>
                        </div>
                        <form onSubmit={handleReportSubmit}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Please explain your issue with this content:</label>
                            <textarea value={reportText} onChange={(e) => setReportText(e.target.value)} placeholder="Type details here..." className="w-full border rounded-lg p-3 min-h-[120px] mb-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={() => setIsReportModalOpen(false)} className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700">Cancel</button>
                                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Submit Report</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}