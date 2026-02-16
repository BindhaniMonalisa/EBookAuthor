import DecorativeButterflies from "@/components/DecorativeButterflies";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-transparent relative overflow-hidden">
            <DecorativeButterflies />

            <div className="bg-transparent py-40 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 blur-3xl">
                    <div className="absolute top-0 -left-10 w-[400px] h-[400px] bg-peacock-gold rounded-full"></div>
                    <div className="absolute bottom-0 -right-10 w-[500px] h-[500px] bg-peacock-emerald rounded-full"></div>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.1] text-peacock-navy">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-peacock-medium to-peacock-gold">Story</span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 leading-relaxed font-light">
                        Founded in 2026, BookShelf was born out of a passion for storytelling and a desire to give authors a professional platform to shine.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-peacock-navy mb-6">Mission & Vision</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            We believe that every book deserves a spotlight. Our mission is to bridge the gap between talented authors and global audiences through cutting-edge technology and premium design aesthetics.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Whether you are an established novelist or a rising indie author, BookShelf provides the tools you need to manage your portfolio, protect your identity, and grow your brand.
                        </p>
                    </div>
                    <div className="card-artistic border-peacock-medium/10">
                        <div className="grid grid-cols-2 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-peacock-medium mb-2">1k+</div>
                                <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Authors</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-peacock-medium mb-2">5k+</div>
                                <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Books</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-peacock-medium mb-2">10k+</div>
                                <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Readers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-peacock-medium mb-2">50+</div>
                                <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Countries</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
