import Link from "next/link";
import React from "react";

const CTASection = () => {
    return (
        <section className="w-full py-16 px-4 bg-[#f3f6ff] flex justify-center items-center">
            <div className="max-w-5xl w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-3xl px-6 py-12 md:py-16 text-center text-white shadow-xl shadow-indigo-200/50 flex flex-col items-center">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                    Ready to share your story?
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-purple-100/90 max-w-2xl font-light leading-relaxed mb-8">
                    Your experiences have shaped you. Now let them shape someone else. Join thousands of contributors today.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    <Link href={'/'} className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-purple-700 bg-white hover:bg-purple-50 transition-colors shadow-md active:scale-[0.98]">
                        Start Sharing Free
                    </Link>
                    <Link href={'/'} className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-white border border-white/40 bg-white/5 hover:bg-white/10 transition-colors active:scale-[0.98]">
                        See Premium Plans
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default CTASection;