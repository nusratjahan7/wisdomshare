"use client";

const Unauthorized = () => {
    const handleLogin = () => {
        window.location.href = '/auth/signin';
    };

    const handleHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 font-sans antialiased">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                {/* Amber Badge & Lock Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <svg
                        className="h-8 w-8 animate-pulse"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                {/* Text Content */}
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Unauthorized Access
                </h1>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                    Please log in or check your credentials to view this page. You do not have permission to view this resource.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-3">
                    <button
                        onClick={handleLogin}
                        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow active:scale-[0.98]"
                    >
                        Go to Login
                    </button>

                    <button
                        onClick={handleHome}
                        className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-slate-800 hover:underline"
                    >
                        Return Home
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Unauthorized;