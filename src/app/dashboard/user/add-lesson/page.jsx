"use client";

import React, { useRef, useState } from 'react';
import { authClient } from "@/lib/auth-client";

import toast from 'react-hot-toast';
import { createLesson } from '@/lib/actions/createLesson';
import { suggestMetadata, tightenProse } from '@/lib/actions/ai';


export default function AddLesson() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        category: 'Resilience',
        emotionalTone: 'Reflective',
        accessType: 'Free',
        image: '',
        shortDescription: '',
        content: ''
    });

    const [aiLoading, setAiLoading] = useState(false);
    const [titleSuggestions, setTitleSuggestions] = useState([]);
    const [subtitleSuggestions, setSubtitleSuggestions] = useState([]);
    const [shortDescriptionSuggestions, setShortDescriptionSuggestions] = useState([]);
    const [tagSuggestions, setTagSuggestions] = useState([]);
    const previousContentRef = useRef(null);

    const contentTooShort = formData.content.trim().length < 50;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSuggestMetadata = async () => {
        setAiLoading(true);
        try {
            const result = await suggestMetadata(formData.content, formData.title);
            if (result?.error) {
                toast.error(result.error);
                return;
            }
            setTitleSuggestions(result.titleSuggestions || []);
            setSubtitleSuggestions(result.subtitleSuggestions || []);
            setShortDescriptionSuggestions(result.shortDescriptionSuggestions || []);
            setTagSuggestions(result.tags || []);
        } catch (error) {
            console.error(error);
            toast.error("Couldn't get AI suggestions. Try again.");
        } finally {
            setAiLoading(false);
        }
    };

    const handleTightenProse = async () => {
        setAiLoading(true);
        try {
            const result = await tightenProse(formData.content);
            if (result?.error) {
                toast.error(result.error);
                return;
            }
            previousContentRef.current = formData.content;
            setFormData((prev) => ({ ...prev, content: result.revised }));
            toast.success("Content tightened by AI.", {
                icon: '✨',
                duration: 5000,
            });
            toast((t) => (
                <span className="flex items-center gap-3 text-sm">
                    Prose updated.
                    <button
                        onClick={() => {
                            if (previousContentRef.current !== null) {
                                setFormData((prev) => ({ ...prev, content: previousContentRef.current }));
                            }
                            toast.dismiss(t.id);
                        }}
                        className="font-semibold text-purple-600 underline"
                    >
                        Undo
                    </button>
                </span>
            ), { duration: 6000 });
        } catch (error) {
            console.error(error);
            toast.error("Couldn't tighten prose. Try again.");
        } finally {
            setAiLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            return toast.error("You must be logged in to add a lesson.");
        }

        setLoading(true);
        const loadingToast = toast.loading("Publishing your lesson...");


        const payload = {
            ...formData,
            userId: user.id,
            username: user.name,
            userImage: user.image || ""
        };

        try {

            await createLesson(payload);

            toast.success("Lesson published successfully!", { id: loadingToast });


            setFormData({
                title: '',
                subtitle: '',
                category: 'Resilience',
                emotionalTone: 'Reflective',
                accessType: 'Free',
                image: '',
                shortDescription: '',
                content: ''
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to publish lesson. Try again.", { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Add New Lesson</h1>
                <p className="text-sm text-slate-500 mt-1">Share a life experience that shaped who you are today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs">

                {/* Lesson Title & Subtitle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Lesson Title *</label>
                        <input
                            type="text" required name="title" value={formData.title} onChange={handleChange}
                            placeholder="e.g. The day I stopped people-pleasing"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                        {titleSuggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {titleSuggestions.map((suggestion, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, title: suggestion }))}
                                        className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Subtitle</label>
                        <input
                            type="text" name="subtitle" value={formData.subtitle} onChange={handleChange}
                            placeholder="A short, compelling subtitle"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                        {subtitleSuggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {subtitleSuggestions.map((suggestion, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, subtitle: suggestion }))}
                                        className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Category *</label>
                        <select
                            name="category" value={formData.category} onChange={handleChange}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-purple-500"
                        >
                            <option value="Resilience">Resilience</option>
                            <option value="Career">Career</option>
                            <option value="Mindset">Mindset</option>
                            <option value="Relationships">Relationships</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Emotional Tone *</label>
                        <select
                            name="emotionalTone" value={formData.emotionalTone} onChange={handleChange}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-purple-500"
                        >
                            <option value="Reflective">Reflective</option>
                            <option value="Motivating">Motivating</option>
                            <option value="Humorous">Humorous</option>
                            <option value="Serious">Serious</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Access Type</label>
                        <select
                            name="accessType" value={formData.accessType} onChange={handleChange}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-purple-500"
                        >
                            <option value="Free">Free</option>
                            <option value="Premium">Premium</option>
                        </select>
                    </div>
                </div>

                {/* Featured Image URL */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Featured Image URL</label>
                    <input
                        type="url" name="image" value={formData.image} onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                </div>

                {/* Short Description */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Short Description *</label>
                    <input
                        type="text" required name="shortDescription" value={formData.shortDescription} onChange={handleChange}
                        placeholder="A brief preview of your lesson (shown in cards)"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                    {shortDescriptionSuggestions.length > 0 && (
                        <div className="flex flex-col gap-1.5 pt-1">
                            {shortDescriptionSuggestions.map((suggestion, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, shortDescription: suggestion }))}
                                    className="text-left text-xs px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Full Lesson Content */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-700">Full Lesson Content *</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleSuggestMetadata}
                                disabled={contentTooShort || aiLoading}
                                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {aiLoading ? "Thinking..." : "✨ Suggest details"}
                            </button>
                            <button
                                type="button"
                                onClick={handleTightenProse}
                                disabled={contentTooShort || aiLoading}
                                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {aiLoading ? "Thinking..." : "✨ Tighten with AI"}
                            </button>
                        </div>
                    </div>
                    <textarea
                        required name="content" rows={6} value={formData.content} onChange={handleChange}
                        placeholder="Write your lesson here. Be honest, specific, and human. Your vulnerability is your strength."
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none"
                    />
                    {tagSuggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 items-center pt-1">
                            <span className="text-xs text-slate-400">Suggested tags:</span>
                            {tagSuggestions.map((tag, i) => (
                                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit" disabled={loading}
                        className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        Publish Lesson
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2.5 rounded-full text-sm font-semibold border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors"
                    >
                        Save as Draft
                    </button>
                </div>

            </form>
        </div>
    );
}