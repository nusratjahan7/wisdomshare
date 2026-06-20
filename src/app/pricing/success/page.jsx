import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        return (
            <div className="min-h-screen bg-(--background2) flex items-center justify-center p-6 pt-20">

                <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-zinc-100 shadow-2xl shadow-indigo-100/40 text-center relative overflow-hidden transition-all duration-300 hover:scale-[1.01]">


                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-400 to-indigo-600 rounded-b-full"></div>


                    <div className="mx-auto my-6 w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 text-4xl font-bold animate-bounce shadow-xs">
                        ✓
                    </div>


                    <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
                        Payment Successful! 🎉
                    </h1>
                    <p className="text-zinc-500 text-xs font-medium mt-2 px-2">
                        Thank you for upgrading! Your premium account is now active and ready to use.
                    </p>


                    <div className="mt-6 bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-left flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-zinc-200/60 pb-2.5">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Account Email</span>
                            <span className="text-xs font-bold text-zinc-700 truncate max-w-[200px]">{customerEmail}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Access Level</span>
                            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 text-[10px] font-black px-2.5 py-0.5 rounded-md">
                                LIFETIME PREMIUM ✨
                            </span>
                        </div>
                    </div>


                    <p className="text-[11px] font-semibold text-zinc-400 leading-relaxed mt-6">
                        A confirmation email will be sent to <span className="text-zinc-600">{customerEmail}</span>.
                        If you have any questions, feel free to email <a href="mailto:orders@example.com" className="text-indigo-600 hover:underline">orders@example.com</a>.
                    </p>


                    <div className="mt-8 flex flex-col gap-2">
                        <Link
                            href="/lessons"
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-95 font-extrabold text-xs h-11 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            Explore Premium Lessons 🚀
                        </Link>
                        <Link
                            href="/dashboard/user"
                            className="w-full border border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50 font-bold text-xs h-11 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}