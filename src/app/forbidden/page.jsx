"use client";

const Forbidden = () => {
    const handleBack = () => {

        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    const handleHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 font-sans antialiased">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                {/* Red Badge & Shield Alert Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <svg
                        className="h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>

                {/* Text Content */}
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Access Forbidden
                </h1>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                    You've authenticated successfully, but your account doesn't have the required permissions to access this page.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-3">
                    <button
                        onClick={handleBack}
                        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
                    >
                        Go Back
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

export default Forbidden;