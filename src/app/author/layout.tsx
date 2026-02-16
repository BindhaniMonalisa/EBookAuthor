"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import DecorativeButterflies from "@/components/DecorativeButterflies";

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { label: "Dashboard", href: "/author/dashboard", icon: "📊" },
        { label: "My Books", href: "/author/books", icon: "📚" },
        { label: "Add New Book", href: "/author/books/create", icon: "➕" },
        { label: "Add Image & PDF", href: "/author/books/resources", icon: "🖼️" },
        { label: "My Profile", href: "/author/profile", icon: "👤" },
        { label: "Support Requests", href: "/author/requests", icon: "📩" },
    ];

    const handleLogout = async () => {
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col md:flex-row pt-20 relative overflow-hidden">
            <DecorativeButterflies />

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-peacock-navy text-white flex flex-col p-6 shadow-[10px_0_30px_rgba(0,0,0,0.1)] relative z-10 border-r border-white/5">
                <div className="mb-10 text-center relative group">
                    <div className="absolute inset-0 bg-peacock-gold/5 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-tr from-peacock-medium to-peacock-gold rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
                            ✍️
                        </div>
                        <div className="absolute -top-2 -right-2 bg-white text-peacock-navy text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">Pro</div>
                    </div>
                    <h3 className="font-extrabold text-xl tracking-tight">Author <span className="text-peacock-gold">Studio</span></h3>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 bg-peacock-gold rounded-full animate-pulse"></span>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Premium Access</p>
                    </div>
                </div>

                <nav className="flex-grow space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 p-4 rounded-xl transition ${pathname === item.href
                                ? "bg-white/10 text-peacock-gold border-l-4 border-peacock-gold"
                                : "hover:bg-white/5 text-white/70"
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span className="font-semibold">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-10 flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-400/10 transition font-bold group"
                >
                    <span className="group-hover:translate-x-1 transition-transform">🚪</span>
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
