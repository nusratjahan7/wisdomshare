"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { followAuthor, unfollowAuthor } from "@/lib/actions/follows";
import { getFollowStatus } from "@/lib/api/follows";

const FollowButton = ({ authorId, initialIsFollowing, isLoggedIn, compact = false }) => {
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing || false);
    const [loading, setLoading] = useState(false);

    // When no server-provided initial state was given (e.g. used inline in a
    // client component like a comment list), fetch it ourselves on mount.
    useEffect(() => {
        if (initialIsFollowing !== undefined || !isLoggedIn || !authorId) return;
        let cancelled = false;
        getFollowStatus(authorId).then((res) => {
            if (!cancelled) setIsFollowing(!!res?.isFollowing);
        }).catch(() => { });
        return () => { cancelled = true; };
    }, [authorId, isLoggedIn, initialIsFollowing]);

    const handleToggleFollow = async () => {
        if (!isLoggedIn) {
            router.push("/auth/signin");
            return;
        }

        setLoading(true);
        const previousState = isFollowing;
        setIsFollowing(!previousState);

        try {
            if (previousState) {
                await unfollowAuthor(authorId);
                toast.success("Unfollowed.");
            } else {
                await followAuthor(authorId);
                toast.success("Followed!");
            }
        } catch (error) {
            console.error(error);
            setIsFollowing(previousState);
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggleFollow}
            disabled={loading}
            className={`rounded-full font-semibold transition-colors disabled:opacity-50 ${compact ? "px-3 py-1 text-xs" : "px-5 py-2 text-sm"
                } ${isFollowing
                    ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
                }`}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;
