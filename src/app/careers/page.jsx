import { Briefcase } from 'lucide-react';

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Careers</h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        Help build a platform where honest stories find their readers.
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 mt-9">
                <div className="bg-white border border-zinc-100 rounded-2xl p-12 text-center shadow-xs">
                    <Briefcase className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-zinc-900 mb-2">No open positions right now</h2>
                    <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
                        We don&apos;t have any roles open at the moment, but we&apos;re always happy to hear from people who care about this space. Reach out and tell us what you&apos;d want to work on.
                    </p>
                    <a
                        href="mailto:hello@wisdomshare.io"
                        className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    );
}
