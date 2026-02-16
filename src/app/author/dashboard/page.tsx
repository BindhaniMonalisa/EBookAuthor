"use client";

import { useState, useEffect } from "react";

export default function AuthorDashboard() {
    const [stats, setStats] = useState({
        books: 0,
        requests: 0,
        active: true,
    });

    useEffect(() => {
        // Fetch stats from API
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/books");
                const result = await res.json();
                if (result.success) {
                    setStats(prev => ({ ...prev, books: result.data.length }));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div className="relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-peacock-gold/5 rounded-full blur-[100px] -z-10"></div>
                <h1 className="text-5xl font-black text-peacock-navy tracking-tight leading-tight">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-peacock-medium to-peacock-gold">Author</span>
                </h1>
                <p className="text-gray-500 text-lg font-light mt-2 italic">Cultivate your literary legacy in your private sanctuary.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card-artistic border-peacock-medium/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-peacock-medium/5 rounded-bl-full group-hover:scale-150 transition-transform"></div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Total Books</div>
                    <div className="text-5xl font-black text-peacock-medium group-hover:translate-x-1 transition-transform">{stats.books}</div>
                </div>
                <div className="card-artistic border-peacock-medium/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-peacock-navy/5 rounded-bl-full group-hover:scale-150 transition-transform"></div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Status</div>
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                        <span className="text-2xl font-black text-peacock-navy">Active Artist</span>
                    </div>
                </div>
                <div className="card-artistic border-peacock-medium/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-peacock-gold/5 rounded-bl-full group-hover:scale-150 transition-transform"></div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Pending Requests</div>
                    <div className="text-5xl font-black text-peacock-gold group-hover:translate-x-1 transition-transform">{stats.requests}</div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-peacock-medium/10 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-peacock-navy">Quick Actions</h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button className="flex items-center gap-6 p-6 bg-gray-50/50 rounded-2xl border border-transparent hover:border-peacock-medium hover:bg-white transition-all group shadow-sm hover:shadow-md">
                        <div className="w-14 h-14 bg-peacock-medium/10 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition group-hover:bg-peacock-medium group-hover:text-white">📝</div>
                        <div className="text-left">
                            <div className="font-black text-peacock-navy text-lg group-hover:text-peacock-medium transition">Publish New Book</div>
                            <div className="text-sm text-gray-500 font-light">Add a new SKU and ISBN to your list</div>
                        </div>
                    </button>
                    <button className="flex items-center gap-6 p-6 bg-gray-50/50 rounded-2xl border border-transparent hover:border-peacock-gold hover:bg-white transition-all group shadow-sm hover:shadow-md">
                        <div className="w-14 h-14 bg-peacock-gold/10 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition group-hover:bg-peacock-gold group-hover:text-white">🔄</div>
                        <div className="text-left">
                            <div className="font-black text-peacock-navy text-lg group-hover:text-peacock-gold transition">Request Detail Update</div>
                            <div className="text-sm text-gray-500 font-light">Submit a request for email or password change</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
