"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-black text-peacock-navy flex items-center gap-3 group">
                    <div className="relative">
                        <span className="text-2xl group-hover:rotate-12 transition-transform inline-block">🪶</span>
                        <div className="absolute inset-0 bg-peacock-gold/20 blur-lg rounded-full -z-10 group-hover:scale-150 transition-transform"></div>
                    </div>
                    <span className="tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-peacock-navy to-peacock-medium">BookShelf</span>
                </Link>

                <div className="hidden md:flex items-center space-x-10">
                    <Link href="/" className={`text-peacock-navy font-bold hover:text-peacock-medium transition relative py-1 group ${pathname === "/" ? "text-peacock-medium" : ""}`}>
                        Home
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-peacock-gold transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                    </Link>
                    <Link href="/about" className="text-peacock-navy font-bold hover:text-peacock-medium transition py-1 relative group">
                        About
                        <span className="absolute bottom-0 left-0 h-0.5 bg-peacock-gold w-0 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href="/contact" className="text-peacock-navy font-bold hover:text-peacock-medium transition py-1 relative group">
                        Contact
                        <span className="absolute bottom-0 left-0 h-0.5 bg-peacock-gold w-0 group-hover:w-full transition-all duration-300"></span>
                    </Link>

                    <Link href="/login" className="peacock-button text-sm px-8 py-2.5 shadow-lg hover:shadow-peacock-medium/20">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
