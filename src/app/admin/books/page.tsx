"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminBooks() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch("/api/books");
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
        if (!confirm("Are you sure you want to delete this book? This action is irreversible.")) return;

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
                    <h1 className="text-3xl font-bold text-peacock-navy">Book Library</h1>
                    <p className="text-gray-500">Overview of all books published on the platform.</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading catalog...</div>
            ) : books.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-6">📚</div>
                    <h3 className="text-2xl font-bold text-gray-400">No books in the library yet</h3>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-peacock-medium/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-peacock-medium text-white">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Book Title</th>
                                    <th className="px-6 py-4 font-bold">Author ID</th>
                                    <th className="px-6 py-4 font-bold">SKU</th>
                                    <th className="px-6 py-4 font-bold">Price</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {books.map((book) => (
                                    <tr key={book._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {book.imageUrl ? (
                                                    <img src={book.imageUrl} alt={book.title} className="w-10 h-14 object-cover rounded shadow-sm" />
                                                ) : (
                                                    <div className="w-10 h-14 bg-gray-100 flex items-center justify-center text-xs text-gray-400">IMG</div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-peacock-navy">{book.title}</div>
                                                    <div className="text-xs text-gray-400">ISBN: {book.isbn}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {book.authorId}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono">{book.sku}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-peacock-medium font-bold">${book.price}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-xs font-bold text-gray-500">Stock: {book.quantity ?? 0}</div>
                                                {(book.isStock && (book.quantity ?? 0) > 0) ? (
                                                    <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-[10px] font-bold w-fit tracking-wider">AVAILABLE</span>
                                                ) : (
                                                    <span className="bg-red-100 text-red-700 px-3 py-0.5 rounded-full text-[10px] font-bold w-fit tracking-wider">OUT OF STOCK</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="text-red-500 hover:text-red-700 font-bold transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
