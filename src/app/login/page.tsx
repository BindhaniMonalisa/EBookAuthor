"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DecorativeButterflies from "@/components/DecorativeButterflies";

export default function LoginPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isAdmin ? "/api/auth/admin/login" : "/api/auth/author/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        router.push(isAdmin ? "/admin/dashboard" : "/author/dashboard");
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent pt-24 relative overflow-hidden">
      <DecorativeButterflies />

      <div className="bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row relative z-10 border border-white/30">
        {/* Visual Side */}
        <div className="md:w-1/2 peacock-gradient-glass p-12 text-white flex flex-col justify-center relative overflow-hidden group">
          {/* Animated background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-peacock-gold/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-peacock-emerald/10 rounded-full blur-2xl -ml-24 -mb-24 group-hover:scale-150 transition-transform duration-700"></div>

          <h2 className="text-5xl font-black mb-6 leading-tight">Welcome <span className="text-peacock-navy">Back</span></h2>
          <p className="text-white/80 text-xl mb-12 font-light leading-relaxed">
            {isAdmin
              ? "Access the administrative command center to oversee the platform's growth and manage author requests."
              : "Step into your creative studio. Manage your books, update your profile, and reach your readers."}
          </p>
          <div className="mt-auto relative">
            <div className="absolute -left-6 top-0 w-1 h-full bg-peacock-gold/30 rounded-full"></div>
            <p className="text-peacock-medium font-bold text-lg italic tracking-wide">"Design is not just what it looks like and feels like. Design is how it works."</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-12">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-bold text-peacock-navy">Sign In</h3>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-sm font-semibold text-peacock-medium hover:text-peacock-gold transition underline"
            >
              Switch to {isAdmin ? "Author" : "Admin"} Login
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                placeholder="Enter your username"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                placeholder="••••••••"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full peacock-gradient text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Signing in..." : `Sign in as ${isAdmin ? "Admin" : "Author"}`}
            </button>
          </form>

          {!isAdmin && (
            <p className="mt-8 text-center text-gray-600">
              New author?{" "}
              <Link href="/register" className="text-peacock-medium font-bold hover:text-peacock-gold transition">
                Apply for an account
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
