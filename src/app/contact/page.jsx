import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-(--background2) text-zinc-800 pb-20">
            <div className="w-full bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-700 pt-32 pb-20 px-4 text-center text-white">
                <div className="max-w-3xl mx-auto flex flex-col gap-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Us</h1>
                    <p className="text-zinc-200/90 text-sm md:text-base font-medium">
                        Questions, feedback, or something else on your mind? We&apos;d like to hear it.
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 mt-9">
                <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-xs flex flex-col gap-6">
                    <a href="mailto:hello@wisdomshare.io" className="flex items-center gap-4 group">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Email</p>
                            <p className="text-sm font-semibold text-zinc-900 group-hover:text-purple-600 transition-colors">hello@wisdomshare.io</p>
                        </div>
                    </a>

                    <a href="tel:+8801700000000" className="flex items-center gap-4 group">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Phone</p>
                            <p className="text-sm font-semibold text-zinc-900 group-hover:text-purple-600 transition-colors">+880 1700-000000</p>
                        </div>
                    </a>

                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Location</p>
                            <p className="text-sm font-semibold text-zinc-900">Gulshan-2, Dhaka 1212, Bangladesh</p>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-zinc-400 mt-6">
                    We try to respond to every message within a couple of business days.
                </p>
            </div>
        </div>
    );
}
