"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import DecorativeButterflies from "@/components/DecorativeButterflies";

interface BookDetail {
    _id: string;
    sku: string;
    isbn: string;
    title: string;
    imageUrl?: string;
    extraImages?: string[];
    documents?: { label: string; url: string }[];
    shortUrl: string;
    description: string;
    price: number;
    discountedPrice?: number;
    isStock: boolean;
    quantity: number;
    authorId: { _id: string; name: string; profileImage?: string } | string;
    createdAt: string;
}

export default function BookDetailPage({ params }: { params: any }) {
    const resolvedParams = use<{ id: string }>(params);
    const [book, setBook] = useState<BookDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`/api/books/${resolvedParams.id}`);
                const data = await res.json();
                if (data.success) {
                    setBook(data.data);
                    setSelectedImage(data.data.imageUrl || null);
                }
            } catch (err) {
                console.error("Failed to fetch book:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [resolvedParams.id]);

    const allImages = book
        ? [book.imageUrl, ...(book.extraImages || [])].filter(Boolean) as string[]
        : [];

    const authorName =
        book && typeof book.authorId === "object" && book.authorId?.name
            ? book.authorId.name
            : "Unknown Author";

    const authorImage =
        book && typeof book.authorId === "object" && book.authorId?.profileImage
            ? book.authorId.profileImage
            : null;

    if (loading) {
        return (
            <section className="pt-28 pb-20 min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-peacock-medium/30 border-t-peacock-medium rounded-full animate-spin"></div>
            </section>
        );
    }

    if (!book) {
        return (
            <section className="pt-28 pb-20 min-h-screen flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-3xl font-bold text-peacock-navy mb-2">Book Not Found</h2>
                <p className="text-gray-500 mb-6">The book you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/books" className="peacock-button text-sm px-8 py-2.5">
                    ← Back to Books
                </Link>
            </section>
        );
    }

    return (
        <section className="pt-28 pb-20 min-h-screen relative overflow-hidden">
            <DecorativeButterflies />

            {/* Lightbox */}
            {lightboxOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/80 hover:text-white text-4xl font-light transition"
                        onClick={() => setLightboxOpen(false)}
                    >
                        ✕
                    </button>
                    <img
                        src={selectedImage}
                        alt={book.title}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <div className="container mx-auto px-6">
                {/* Back Link */}
                <Link
                    href="/books"
                    className="inline-flex items-center gap-2 text-peacock-medium hover:text-peacock-dark font-semibold mb-8 transition group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Books
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left — Images */}
                    <div>
                        {/* Main Image */}
                        <div
                            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-peacock-light/10 to-peacock-dark/10 shadow-lg cursor-pointer group"
                            onClick={() => { setLightboxOpen(true); }}
                        >
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-8xl opacity-20">📖</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold bg-black/40 px-4 py-2 rounded-full">
                                    🔍 Click to zoom
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        {allImages.length > 1 && (
                            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === img
                                                ? "border-peacock-medium shadow-md scale-105"
                                                : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300"
                                            }`}
                                    >
                                        <img src={img} alt={`${book.title} image ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right — Details */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-peacock-navy mb-4 tracking-tight leading-tight">
                            {book.title}
                        </h1>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 mb-6">
                            {authorImage ? (
                                <img src={authorImage} alt={authorName} className="w-10 h-10 rounded-full object-cover border-2 border-peacock-gold/30" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-peacock-light to-peacock-dark flex items-center justify-center text-white font-bold text-sm">
                                    {authorName.charAt(0)}
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-500">Written by</p>
                                <p className="font-semibold text-peacock-navy">{authorName}</p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6 p-4 bg-peacock-light/5 rounded-xl border border-peacock-light/10">
                            {book.discountedPrice ? (
                                <>
                                    <span className="text-3xl font-black text-peacock-medium">₹{book.discountedPrice}</span>
                                    <span className="text-xl text-gray-400 line-through">₹{book.price}</span>
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                        {Math.round(((book.price - book.discountedPrice) / book.price) * 100)}% OFF
                                    </span>
                                </>
                            ) : (
                                <span className="text-3xl font-black text-peacock-medium">₹{book.price}</span>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className={`w-2.5 h-2.5 rounded-full ${book.isStock ? "bg-green-500" : "bg-red-500"}`}></span>
                            <span className={`text-sm font-semibold ${book.isStock ? "text-green-600" : "text-red-500"}`}>
                                {book.isStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-peacock-navy mb-3">About this Book</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{book.description}</p>
                        </div>

                        {/* Book Meta */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">ISBN</p>
                                <p className="font-semibold text-peacock-navy text-sm">{book.isbn}</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">SKU</p>
                                <p className="font-semibold text-peacock-navy text-sm">{book.sku}</p>
                            </div>
                        </div>

                        {/* Documents */}
                        {book.documents && book.documents.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-peacock-navy mb-3">📄 Documents</h3>
                                <div className="space-y-2">
                                    {book.documents.map((doc, idx) => (
                                        <a
                                            key={idx}
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-gray-100 hover:border-peacock-medium/30 hover:bg-peacock-light/5 transition group"
                                        >
                                            <span className="text-peacock-medium">📎</span>
                                            <span className="font-medium text-sm text-peacock-navy group-hover:text-peacock-medium transition">
                                                {doc.label}
                                            </span>
                                            <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-peacock-medium transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
