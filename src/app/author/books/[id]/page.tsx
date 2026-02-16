"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BookDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`/api/books/${id}`);
                const result = await res.json();
                if (result.success) {
                    setBook(result.data);
                } else {
                    setError(result.message || "Failed to fetch book details");
                }
            } catch (err) {
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading book details...</div>;
    if (error) return (
        <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <Link href="/author/books" className="text-peacock-medium underline font-bold">Back to Library</Link>
        </div>
    );
    if (!book) return <div className="text-center py-20">Book not found</div>;

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Link href="/author/books" className="text-peacock-medium text-sm font-bold flex items-center gap-2 mb-2 hover:translate-x-[-4px] transition-transform">
                        ← Back to Library
                    </Link>
                    <h1 className="text-4xl font-black text-peacock-navy">{book.title}</h1>
                </div>
                <div className="flex gap-4">
                    <Link
                        href={`/author/books/edit/${book._id}`}
                        className="px-6 py-2 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition"
                    >
                        Edit Book
                    </Link>
                    <Link
                        href="/author/books/resources"
                        className="px-6 py-2 rounded-xl bg-peacock-navy text-white font-bold hover:opacity-90 transition shadow-lg"
                    >
                        Manage Resources
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Book Info */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white rounded-3xl p-8 border border-peacock-medium/10 shadow-sm space-y-6">
                        <div className="flex flex-wrap gap-8 text-sm border-b pb-6">
                            <div>
                                <p className="text-gray-400 mb-1">ISBN</p>
                                <p className="font-bold text-peacock-navy">{book.isbn}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">SKU</p>
                                <p className="font-bold text-peacock-navy">{book.sku}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">Inventory</p>
                                <p className={`font-bold ${book.quantity > 0 ? "text-green-600" : "text-red-500"}`}>
                                    {book.isStock ? `In Stock (${book.quantity})` : "Out of Stock"}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 mb-1">Price</p>
                                <p className="font-bold text-peacock-gold text-lg">${book.price}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-peacock-navy mb-4">Description</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{book.description}</p>
                        </div>
                    </div>

                    {/* Extra Images */}
                    <div>
                        <h3 className="text-2xl font-black text-peacock-navy mb-6 flex items-center gap-3">
                            <span className="text-3xl">🖼️</span> Image Gallery
                        </h3>
                        {book.extraImages && book.extraImages.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {book.extraImages.map((img: string, i: number) => (
                                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition group">
                                        <img src={img} alt={`${book.title} gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 border-2 border-dashed rounded-3xl p-10 text-center text-gray-400">
                                No additional images uploaded yet.
                            </div>
                        )}
                    </div>

                    {/* Documents */}
                    <div>
                        <h3 className="text-2xl font-black text-peacock-navy mb-6 flex items-center gap-3">
                            <span className="text-3xl">📄</span> Documents & PDFs
                        </h3>
                        {book.documents && book.documents.length > 0 ? (
                            <div className="space-y-4">
                                {book.documents.map((doc: any, i: number) => (
                                    <a
                                        key={i}
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex justify-between items-center p-6 bg-white rounded-2xl border border-peacock-medium/10 shadow-sm hover:border-peacock-medium transition group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xl font-bold">
                                                PDF
                                            </div>
                                            <div>
                                                <p className="font-bold text-peacock-navy group-hover:text-peacock-medium transition">{doc.label}</p>
                                                <p className="text-xs text-gray-400">Click to open or download</p>
                                            </div>
                                        </div>
                                        <span className="text-peacock-medium font-black">→</span>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 border-2 border-dashed rounded-3xl p-10 text-center text-gray-400">
                                No PDF documents attached.
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar / Cover */}
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-4 border border-peacock-medium/10 shadow-xl">
                        <div className="aspect-[2/3] rounded-2xl overflow-hidden peacock-gradient relative">
                            {book.imageUrl ? (
                                <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20 font-black text-4xl">
                                    COVER
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-peacock-navy/5 rounded-3xl p-8 border border-peacock-navy/10">
                        <h4 className="font-black text-peacock-navy mb-4">Quick Stats</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Total Resources</span>
                                <span className="font-bold">{(book.extraImages?.length || 0) + (book.documents?.length || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Images</span>
                                <span className="font-bold">{book.extraImages?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">PDFs</span>
                                <span className="font-bold">{book.documents?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
