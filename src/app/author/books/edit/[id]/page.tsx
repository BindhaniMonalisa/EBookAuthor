"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBook() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        sku: "",
        isbn: "",
        title: "",
        imageUrl: "",
        shortUrl: "",
        description: "",
        price: 0,
        discountedPrice: 0,
        isStock: true,
        quantity: 0,
        amazonAttributes: {},
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`/api/books`, { cache: "no-store" });
                const result = await res.json();
                if (result.success) {
                    const book = result.data.find((b: any) => b._id === id);
                    if (book) {
                        setFormData({
                            sku: book.sku,
                            isbn: book.isbn,
                            title: book.title,
                            imageUrl: book.imageUrl || "",
                            shortUrl: book.shortUrl,
                            description: book.description,
                            price: book.price,
                            discountedPrice: book.discountedPrice || 0,
                            isStock: book.isStock ?? true,
                            quantity: book.quantity || 0,
                            amazonAttributes: book.amazonAttributes || {},
                        });
                    } else {
                        setError("Book not found");
                    }
                } else {
                    setError(result.message || "Failed to fetch book details");
                }
            } catch (err) {
                setError("An error occurred while fetching book details");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBook();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const res = await fetch(`/api/books/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (result.success) {
                router.push("/author/books");
            } else {
                setError(result.message || "Failed to update book");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading book data...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-peacock-navy">Edit Book</h1>
                <p className="text-gray-500">Update the details of your book.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-peacock-medium/10 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Book Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Book Cover Image URL</label>
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    placeholder="https://example.com/cover.jpg"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Internal SKU</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.sku}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Unique ISBN</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.isbn}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Short URL Slug</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.shortUrl}
                                    placeholder="e.g. the-great-adventure"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                                    onChange={(e) => setFormData({ ...formData, shortUrl: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price (Optional)</label>
                                <input
                                    type="number"
                                    value={formData.discountedPrice}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                                    onChange={(e) => setFormData({ ...formData, discountedPrice: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.quantity}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Out of Stock</label>
                                <div className="flex items-center gap-4 py-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={!formData.isStock}
                                            onChange={(e) => setFormData({ ...formData, isStock: !e.target.checked })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-peacock-gold"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-600">Mark as Out of Stock</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition resize-none"
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-8 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 rounded-xl font-bold peacock-gradient text-white shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                        >
                            {saving ? "Saving Changes..." : "Update Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
