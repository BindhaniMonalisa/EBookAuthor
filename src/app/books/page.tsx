"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DecorativeButterflies from "@/components/DecorativeButterflies";

interface Book {
    _id: string;
    title: string;
    imageUrl?: string;
    description: string;
    price: number;
    discountedPrice?: number;
    isStock: boolean;
    authorId: { name: string; profileImage?: string } | string;
}

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch("/api/books");
                const data = await res.json();
                if (data.success) {
                    setBooks(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch books:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="pt-28 pb-20 min-h-screen relative overflow-hidden">
            <DecorativeButterflies />

            {/* Header */}
            <div className="container mx-auto px-6 mb-12 text-center">
                <h1 className="text-5xl md:text-6xl font-black text-peacock-navy mb-4 tracking-tight">
                    Explore Our{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-peacock-medium to-peacock-dark">
                        Collection
                    </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Discover captivating stories from talented authors around the world
                </p>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-peacock-medium/40 focus:border-peacock-medium transition-all shadow-sm text-peacock-navy placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Books Grid */}
            <div className="container mx-auto px-6">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-peacock-medium/30 border-t-peacock-medium rounded-full animate-spin"></div>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold text-peacock-navy mb-2">No books found</h3>
                        <p className="text-gray-500">
                            {search ? "Try a different search term" : "Check back later for new releases!"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <Link href={`/books/${book._id}`} key={book._id} className="group">
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-peacock-medium/10 transition-all duration-500 hover:-translate-y-2">
                                    {/* Book Cover */}
                                    <div className="relative aspect-[3/4] bg-gradient-to-br from-peacock-light/10 to-peacock-dark/10 overflow-hidden">
                                        {book.imageUrl ? (
                                            <img
                                                src={book.imageUrl}
                                                alt={book.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-7xl opacity-30">📖</span>
                                            </div>
                                        )}
                                        {/* Price Badge */}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
                                            {book.discountedPrice ? (
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs text-gray-400 line-through">₹{book.price}</span>
                                                    <span className="text-sm font-bold text-peacock-medium">₹{book.discountedPrice}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm font-bold text-peacock-medium">₹{book.price}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Book Info */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-peacock-navy mb-1 line-clamp-2 group-hover:text-peacock-medium transition-colors">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-3">
                                            by {typeof book.authorId === "object" && book.authorId?.name
                                                ? book.authorId.name
                                                : "Unknown Author"}
                                        </p>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {book.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
