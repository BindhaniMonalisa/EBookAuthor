"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DecorativeButterflies from "@/components/DecorativeButterflies";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { label: "Dashboard", href: "/admin/dashboard", icon: "🏛️" },
        { label: "Authors", href: "/admin/authors", icon: "✍️" },
        { label: "Book Library", href: "/admin/books", icon: "📚" },
        { label: "Author Requests", href: "/admin/requests", icon: "⚖️" },
        { label: "My Profile", href: "/admin/profile", icon: "👤" },
    ];

    return (
        <div className="min-h-screen bg-transparent flex flex-col md:flex-row pt-20 relative overflow-hidden">
            <DecorativeButterflies />
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-peacock-medium text-white flex flex-col p-6 shadow-2xl relative z-10">
                <div className="mb-10 text-center">
                    <div className="w-20 h-20 bg-peacock-gold rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                        👑
                    </div>
                    <h3 className="font-bold text-lg">Admin Control</h3>
                    <p className="text-white/50 text-xs text-peacock-gold font-bold">MASTER ROLE</p>
                </div>

                <nav className="flex-grow space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 p-4 rounded-xl transition ${pathname === item.href
                                ? "bg-white/10 text-peacock-gold border-r-4 border-peacock-gold"
                                : "hover:bg-white/5 text-white/70"
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span className="font-semibold">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={() => router.push("/login")}
                    className="mt-10 flex items-center gap-4 p-4 rounded-xl text-red-100 hover:bg-red-400/20 transition"
                >
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
