"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DecorativeButterflies from "@/components/DecorativeButterflies";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    dob: "",
    currentAddress: "",
    mobile: "",
    authorUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/author/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        router.push("/login");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-24 px-6 flex items-center justify-center relative overflow-hidden">
      <DecorativeButterflies />

      <div className="bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col relative z-10 border border-white/30">
        <div className="peacock-gradient-glass p-12 text-white text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-peacock-gold/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-peacock-emerald/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

          <h2 className="text-5xl font-black mb-4 tracking-tight">Author <span className="text-peacock-navy">Application</span></h2>
          <p className="text-white/80 text-xl font-light">Join our exclusive circle of literary masters and share your stories with the world.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {error && (
            <div className="col-span-full bg-red-50 text-red-500 p-4 rounded-xl text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Desired Username</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile URL Slug (e.g., john-doe)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                onChange={(e) => setFormData({ ...formData, authorUrl: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Address</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-peacock-medium focus:ring-2 focus:ring-peacock-medium/20 transition outline-none"
                onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
              />
            </div>
          </div>

          <div className="col-span-full mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full peacock-gradient text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit Application"}
            </button>
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-peacock-medium font-bold hover:text-peacock-gold transition">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
