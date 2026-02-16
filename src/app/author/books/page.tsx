"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AuthorBooks() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch("/api/books", { cache: "no-store" });
                const result = await res.json();
                if (result.success) {
                    setBooks(result.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this book?")) return;

        try {
            const res = await fetch(`/api/books/${id}`, {
                method: "DELETE",
            });
            const result = await res.json();
            if (result.success) {
                setBooks(books.filter((book) => book._id !== id));
            } else {
                alert(result.message || "Failed to delete book");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while deleting the book");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-peacock-navy">My Books</h1>
                    <p className="text-gray-500">Manage and track your published works.</p>
                </div>
                <Link
                    href="/author/books/create"
                    className="bg-peacock-gold text-peacock-navy px-6 py-3 rounded-xl font-bold hover:shadow-lg transition"
                >
                    + Add New Book
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading your library...</div>
            ) : books.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-6">📖</div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-4">No books found</h3>
                    <Link href="/author/books/create" className="text-peacock-medium font-bold underline">Start by adding your first book</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.map((book) => (
                        <div key={book._id} className="bg-white rounded-2xl shadow-sm border border-peacock-medium/10 overflow-hidden group hover:shadow-xl transition">
                            <div className="h-64 peacock-gradient flex items-center justify-center text-white relative">
                                {book.imageUrl ? (
                                    <img
                                        src={book.imageUrl}
                                        alt={book.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    />
                                ) : (
                                    <span className="text-4xl font-black opacity-20 group-hover:opacity-40 transition">BOOK</span>
                                )}
                                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs">
                                    SKU: {book.sku}
                                </div>
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${(book.isStock && (book.quantity ?? 0) > 0) ? "bg-green-500" : "bg-red-500"}`}>
                                    {book.isStock && (book.quantity ?? 0) > 0 ? "In Stock" : "Out of Stock"}: {String(book.quantity ?? 0)}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-peacock-navy mb-2 line-clamp-1">{book.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{book.description}</p>
                                <div className="flex justify-between items-center border-t pt-4">
                                    <div>
                                        <span className="text-peacock-medium font-bold text-lg">${book.price}</span>
                                        {book.discountedPrice && <span className="ml-2 text-gray-400 line-through text-sm">${book.discountedPrice}</span>}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/author/books/${book._id}`}
                                            className="p-2 text-peacock-medium hover:bg-peacock-medium/5 font-bold rounded-lg transition"
                                        >
                                            Details
                                        </Link>
                                        <Link
                                            href={`/author/books/edit/${book._id}`}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(book._id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
