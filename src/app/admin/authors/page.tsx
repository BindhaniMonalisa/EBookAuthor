"use client";

import { useState, useEffect } from "react";

export default function AdminAuthors() {
    const [authors, setAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAuthors = async () => {
        try {
            const res = await fetch("/api/admin/authors");
            const result = await res.json();
            if (result.success) {
                setAuthors(result.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/authors/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !currentStatus }),
            });
            if (res.ok) {
                fetchAuthors();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-peacock-navy">Author Management</h1>
                <p className="text-gray-500">View and moderate all registered authors on the platform.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-peacock-medium/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-peacock-bg uppercase text-xs font-black text-gray-400">
                            <tr>
                                <th className="px-8 py-6">Author Details</th>
                                <th className="px-8 py-6">Registered On</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-10">Loading authors...</td>
                                </tr>
                            ) : authors.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-gray-400">No authors registered yet.</td>
                                </tr>
                            ) : authors.map((author) => (
                                <tr key={author._id} className="hover:bg-gray-50 transition">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-peacock-navy text-white rounded-full flex items-center justify-center font-bold">
                                                {author.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-peacock-navy">{author.name}</div>
                                                <div className="text-sm text-gray-400">{author.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-gray-500 text-sm">
                                        {new Date(author.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${author.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                                            }`}>
                                            {author.isActive ? "ACTIVE" : "DEACTIVATED"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => toggleStatus(author._id, author.isActive)}
                                            className={`font-bold text-sm px-4 py-2 rounded-xl transition ${author.isActive ? "text-red-500 hover:bg-red-50" : "text-green-600 hover:bg-green-50"
                                                }`}
                                        >
                                            {author.isActive ? "Deactivate" : "Activate"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
