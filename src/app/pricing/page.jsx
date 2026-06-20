"use client";

import { redirect } from 'next/navigation';

export default function PricingPage() {

    const handleCheckout = (planType) => {
        if (planType === 'user_free') {
            redirect('/lessons')
        }
    };

    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">

            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Simple, Honest Pricing
                    </h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        Start free. Go premium when you're ready. One price, forever.
                    </p>
                </div>
            </div>


            <div className="max-w-5xl mx-auto px-6 mt-9 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">


                <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-xl shadow-zinc-200/50 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px]">
                    <div>
                        <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Free Forever</span>
                        <div className="text-4xl font-black text-zinc-900 mt-2">৳০</div>

                        <button
                            onClick={() => handleCheckout('user_free')}
                            className="w-full mt-6 border border-indigo-100 text-indigo-600 bg-indigo-50/40 hover:bg-indigo-50 font-bold text-xs h-11 rounded-xl transition-all shadow-xs cursor-pointer"
                        >
                            Get Started Free
                        </button>

                        <div className="mt-8 flex flex-col gap-3.5">
                            <FeatureItem active={true} text="Access to all free lessons" />
                            <FeatureItem active={true} text="Unlimited lesson browsing" />
                            <FeatureItem active={true} text="Community commenting" />
                            <FeatureItem active={true} text="Save up to 5 lessons" />
                            <FeatureItem active={false} text="Unlimited saves & favorites" />
                            <FeatureItem active={false} text="Full access to premium lessons" />
                            <FeatureItem active={false} text="Ad-free experience" />
                            <FeatureItem active={false} text="Publish unlimited lessons" />
                            <FeatureItem active={false} text="Priority support" />
                            <FeatureItem active={false} text="Premium contributor badge" />
                        </div>
                    </div>
                </div>


                <div className="relative bg-gradient-to-b from-indigo-600 to-violet-700 rounded-3xl p-8 shadow-2xl shadow-indigo-500/20 text-white flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px]">
                    <div className="absolute top-4 right-4 bg-amber-500 text-black text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider shadow-xs">
                        BEST VALUE
                    </div>

                    <div>
                        <span className="text-[10px] font-bold tracking-wider text-indigo-200 uppercase">Lifetime Premium</span>
                        <div className="text-4xl font-black mt-2 flex items-baseline gap-2">
                            ৳১৫০০
                            <span className="text-xs font-semibold text-indigo-200/80">one-time</span>
                        </div>
                        <p className="text-[11px] text-indigo-100/70 mt-1">Pay once. Access forever. No subscriptions.</p>

                        <form action="/api/checkout_sessions" method="POST">
                            <button type="submit" role="link"
                                className="w-full mt-5 bg-white text-indigo-700 hover:bg-zinc-50 font-extrabold text-xs h-11 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-80 cursor-pointer"
                            >
                                Upgrade to Premium <span className="text-amber-500">✨</span>
                            </button>
                        </form>

                        <div className="mt-8 flex flex-col gap-3.5">
                            <PremiumFeatureItem text="Access to all free lessons" />
                            <PremiumFeatureItem text="Unlimited lesson browsing" />
                            <PremiumFeatureItem text="Community commenting" />
                            <PremiumFeatureItem text="Save up to 5 lessons" isStrikethrough={true} />
                            <PremiumFeatureItem text="Unlimited saves & favorites" />
                            <PremiumFeatureItem text="Full access to premium lessons" />
                            <PremiumFeatureItem text="Ad-free experience" />
                            <PremiumFeatureItem text="Publish unlimited lessons" />
                            <PremiumFeatureItem text="Priority support" />
                            <PremiumFeatureItem text="Premium contributor badge" />
                        </div>
                    </div>
                </div>

            </div>


            <div className="mt-12 text-center flex flex-col gap-3 px-4">
                <p className="text-xs font-semibold text-zinc-400 tracking-wide">
                    Secure payment · Instant access · 7-day refund guarantee
                </p>
                <div className="flex flex-wrap justify-center items-center gap-5 text-[11px] font-bold text-zinc-500 mt-1">
                    <span className="flex items-center gap-1.5"><span className="text-emerald-500">🛡️</span> SSL Encrypted</span>
                    <span className="flex items-center gap-1.5"><span className="text-emerald-500">✅</span> Satisfaction Guaranteed</span>
                    <span className="flex items-center gap-1.5"><span className="text-indigo-500">👥</span> 12,000+ Members</span>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ active, text }) {
    return (
        <div className={`flex items-center gap-3 text-xs font-semibold ${active ? 'text-zinc-600' : 'text-zinc-300/80'}`}>
            {active ? <span className="text-emerald-500 text-sm shrink-0">✓</span> : <span className="text-zinc-300 text-xs border border-zinc-200 rounded-full w-4 h-4 flex items-center justify-center font-normal shrink-0">!</span>}
            <span className={!active ? 'line-through text-zinc-300' : ''}>{text}</span>
        </div>
    );
}

function PremiumFeatureItem({ text, isStrikethrough = false }) {
    return (
        <div className="flex items-center gap-3 text-xs font-semibold text-white/90">
            {isStrikethrough ? <span className="text-indigo-300/60 text-xs border border-indigo-400/40 rounded-full w-4 h-4 flex items-center justify-center font-normal shrink-0">!</span> : <span className="text-indigo-200 text-sm shrink-0">✓</span>}
            <span className={isStrikethrough ? 'line-through text-indigo-200/50' : ''}>{text}</span>
        </div>
    );
}