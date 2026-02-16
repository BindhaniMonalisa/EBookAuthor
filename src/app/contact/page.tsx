import DecorativeButterflies from "@/components/DecorativeButterflies";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-transparent py-32 px-6 relative overflow-hidden">
            <DecorativeButterflies />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
                    <div className="peacock-gradient p-12 text-white md:w-1/3 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-peacock-gold/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                        <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
                        <div className="space-y-8 flex-grow">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">📍</span>
                                <div>
                                    <h4 className="font-bold">Address</h4>
                                    <p className="opacity-80">123 Literary Ave, Booktown, BK 56789</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">✉️</span>
                                <div>
                                    <h4 className="font-bold">Email</h4>
                                    <p className="opacity-80">support@bookshelf.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">📞</span>
                                <div>
                                    <h4 className="font-bold">Phone</h4>
                                    <p className="opacity-80">+1 (555) BOOK-HELP</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 flex gap-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">F</div>
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">T</div>
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">I</div>
                        </div>
                    </div>

                    <div className="p-12 md:w-2/3">
                        <h3 className="text-3xl font-bold text-peacock-navy mb-8">Send us a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition resize-none"></textarea>
                            </div>
                            <button className="peacock-gradient text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-1">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
