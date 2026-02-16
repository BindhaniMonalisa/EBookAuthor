"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        authors: 0,
        books: 0,
        pendingRequests: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            // Mock fetching stats
            setStats({ authors: 5, books: 12, pendingRequests: 3 });
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-peacock-navy">Platform Overview</h1>
                <p className="text-gray-500">Monitor all activities and manage author engagement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-peacock-medium/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition">✍️</div>
                    <div className="text-sm font-bold text-gray-400 uppercase mb-2">Authenticated Authors</div>
                    <div className="text-4xl font-black text-peacock-medium">{stats.authors}</div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-peacock-medium/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition">📚</div>
                    <div className="text-sm font-bold text-gray-400 uppercase mb-2">Global Inventory</div>
                    <div className="text-4xl font-black text-peacock-navy">{stats.books}</div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-peacock-medium/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition">⚖️</div>
                    <div className="text-sm font-bold text-gray-400 uppercase mb-2">Pending Actions</div>
                    <div className="text-4xl font-black text-peacock-gold">{stats.pendingRequests}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl shadow-sm border border-peacock-medium/10 p-8">
                    <h3 className="text-xl font-bold text-peacock-navy mb-6">Recent Author Signups</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center p-4 bg-peacock-bg rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-peacock-gold rounded-full flex items-center justify-center text-white">A</div>
                                    <div>
                                        <div className="font-bold text-sm">Author {i}</div>
                                        <div className="text-xs text-gray-400">author{i}@example.com</div>
                                    </div>
                                </div>
                                <span className="text-xs bg-peacock-medium/10 text-peacock-medium px-2 py-1 rounded-full font-bold">NEW</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-peacock-medium/10 p-8">
                    <h3 className="text-xl font-bold text-peacock-navy mb-6">Platform Security</h3>
                    <div className="bg-peacock-navy p-6 rounded-2xl text-white">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">🛡️</span>
                            <div>
                                <h4 className="font-bold mb-1">Encrypted Access</h4>
                                <p className="text-sm opacity-70">All passwords are hashed with bcrypt and sessions are secured with HTTP-only JWT cookies.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
