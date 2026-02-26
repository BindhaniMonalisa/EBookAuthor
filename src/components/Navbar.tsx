"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                if (data.success && data.data.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUserRole(data.data.role);
                } else {
                    setIsAuthenticated(false);
                    setUserRole(null);
                }
            } catch (error) {
                console.error("Error checking auth:", error);
                setIsAuthenticated(false);
                setUserRole(null);
            }
        };

        checkAuth();
    }, [pathname]);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                setIsAuthenticated(false);
                setUserRole(null);
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="fixed w-full z-[1000] transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg py-4">
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
                    <Link href="/books" className={`text-peacock-navy font-bold hover:text-peacock-medium transition relative py-1 group ${pathname === "/books" || pathname.startsWith("/books/") ? "text-peacock-medium" : ""}`}>
                        Books
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-peacock-gold transition-all duration-300 ${pathname === "/books" || pathname.startsWith("/books/") ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                    </Link>
                    <Link href="/about" className={`text-peacock-navy font-bold hover:text-peacock-medium transition py-1 relative group ${pathname === "/about" ? "text-peacock-medium" : ""}`}>
                        About
                        <span className="absolute bottom-0 left-0 h-0.5 bg-peacock-gold w-0 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href="/contact" className="text-peacock-navy font-bold hover:text-peacock-medium transition py-1 relative group">
                        Contact
                        <span className="absolute bottom-0 left-0 h-0.5 bg-peacock-gold w-0 group-hover:w-full transition-all duration-300"></span>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            {userRole === 'author' && (
                                <Link href="/author/dashboard" className="text-peacock-navy font-bold hover:text-peacock-medium transition py-1 relative group">
                                    Dashboard
                                    <span className="absolute bottom-0 left-0 h-0.5 bg-peacock-gold w-0 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            )}
                            {userRole === 'admin' && (
                                <Link href="/admin/dashboard" className="text-peacock-navy font-bold hover:text-peacock-medium transition py-1 relative group">
                                    Admin Panel
                                    <span className="absolute bottom-0 left-0 h-0.5 bg-peacock-gold w-0 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="peacock-button text-sm px-8 py-2.5 shadow-lg hover:shadow-peacock-medium/20"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="peacock-button text-sm px-8 py-2.5 shadow-lg hover:shadow-peacock-medium/20">
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-peacock-navy focus:outline-none"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fadeIn">
                    <Link
                        href="/"
                        className={`text-peacock-navy font-bold hover:text-peacock-medium transition py-2 border-b border-gray-100 ${pathname === "/" ? "text-peacock-medium" : ""}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-peacock-navy font-bold hover:text-peacock-medium transition py-2 border-b border-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/books"
                        className={`text-peacock-navy font-bold hover:text-peacock-medium transition py-2 border-b border-gray-100 ${pathname === "/books" || pathname.startsWith("/books/") ? "text-peacock-medium" : ""}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Books
                    </Link>
                    <Link
                        href="/contact"
                        className="text-peacock-navy font-bold hover:text-peacock-medium transition py-2 border-b border-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact
                    </Link>

                    {isAuthenticated ? (
                        <>
                            {userRole === 'author' && (
                                <Link
                                    href="/author/dashboard"
                                    className="text-peacock-navy font-bold hover:text-peacock-medium transition py-2 border-b border-gray-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}
                            {userRole === 'admin' && (
                                <Link
                                    href="/admin/dashboard"
                                    className="text-peacock-navy font-bold hover:text-peacock-medium transition py-2 border-b border-gray-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="peacock-button text-sm w-full py-2.5 shadow-lg hover:shadow-peacock-medium/20 text-center mt-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="peacock-button text-sm w-full py-2.5 shadow-lg hover:shadow-peacock-medium/20 text-center mt-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
