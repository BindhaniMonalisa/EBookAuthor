"use client";

import { useState, useEffect } from "react";

export default function AuthorProfile() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    // Editable fields
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/author/profile");
                const result = await res.json();
                if (result.success) {
                    setProfile(result.data);
                    setName(result.data.name);
                    setMobile(result.data.mobile);
                    setProfileImage(result.data.profileImage || "");
                }
            } catch (err) {
                setMessage({ text: "Failed to load profile", type: "error" });
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: "", type: "" });

        try {
            const res = await fetch("/api/author/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, mobile, profileImage }),
            });
            const result = await res.json();
            if (result.success) {
                setMessage({ text: "Profile updated successfully!", type: "success" });
                setProfile(result.data);
            } else {
                setMessage({ text: result.message || "Failed to update profile", type: "error" });
            }
        } catch (err) {
            setMessage({ text: "An error occurred while saving", type: "error" });
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage({ text: "", type: "" });

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                setProfileImage(result.data.url);
                setMessage({ text: "Image uploaded successfully! Don't forget to save.", type: "success" });
            } else {
                setMessage({ text: result.message || "Upload failed", type: "error" });
            }
        } catch (err) {
            setMessage({ text: "An error occurred during upload", type: "error" });
        } finally {
            setUploading(false);
        }
    };

    const handleRequest = async (type: "EMAIL_CHANGE" | "PASSWORD_RESET", newEmail?: string) => {
        setRequestLoading(true);
        setMessage({ text: "", type: "" });
        try {
            const res = await fetch("/api/author/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestType: type, newEmail }),
            });
            const result = await res.json();
            if (result.success) {
                setMessage({ text: "Request submitted successfully. Waiting for admin approval.", type: "success" });
            } else {
                setMessage({ text: result.message || "Failed to submit request", type: "error" });
            }
        } catch (err) {
            setMessage({ text: "An error occurred", type: "error" });
        } finally {
            setRequestLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading profile...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-peacock-navy">Account Profile</h1>
                    <p className="text-gray-500">Manage your personal information and account security.</p>
                </div>
            </div>

            {message.text && (
                <div className={`p-4 rounded-2xl text-sm font-bold shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === "success" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-500 border border-red-100"}`}>
                    {message.type === "success" ? "✅" : "⚠️"} {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleUpdateProfile} className="bg-white p-10 rounded-3xl shadow-sm border border-peacock-medium/10 space-y-8">
                        <div className="flex items-center gap-4 border-b pb-6">
                            <div className="w-12 h-12 bg-peacock-navy text-white rounded-2xl flex items-center justify-center text-xl">👤</div>
                            <h3 className="text-2xl font-bold text-peacock-navy">Personal Details</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:border-peacock-medium outline-none transition bg-gray-50/50 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">Mobile Number</label>
                                <input
                                    type="text"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-100 focus:border-peacock-medium outline-none transition bg-gray-50/50 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">Email (Read Only)</label>
                                <div className="px-5 py-3 rounded-xl border border-gray-100 bg-gray-100 text-gray-500 font-medium opacity-70">
                                    {profile.email}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 italic">Email change requires admin approval.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">Public Profile</label>
                                <div className="px-5 py-3 rounded-xl border border-gray-100 bg-gray-100 text-peacock-medium font-bold opacity-70">
                                    bookshelf.com/{profile.authorUrl}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">Profile Image</label>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                        className="hidden"
                                        id="profile-image-upload"
                                    />
                                    <label
                                        htmlFor="profile-image-upload"
                                        className={`flex-grow px-5 py-3 rounded-xl border border-dashed border-gray-300 hover:border-peacock-medium transition bg-gray-50/50 font-medium cursor-pointer flex items-center justify-center gap-2 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {uploading ? "Uploading..." : "Click to Upload New Image"}
                                    </label>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">Or Paste URL:</span>
                                    <input
                                        type="text"
                                        value={profileImage}
                                        onChange={(e) => setProfileImage(e.target.value)}
                                        placeholder="Paste image URL here"
                                        className="flex-grow px-5 py-2 rounded-xl border border-gray-100 focus:border-peacock-medium outline-none transition bg-gray-50/50 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-10 py-4 rounded-xl font-bold peacock-gradient text-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                            >
                                {saving ? "Saving Changes..." : "Save Profile Updates"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Preview & Actions */}
                <div className="space-y-8">
                    {/* Visual Preview */}
                    <div className="bg-peacock-navy rounded-3xl p-8 text-white text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-peacock-gold"></div>
                        <div className="relative z-10">
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl">✍️</span>
                                )}
                            </div>
                            <h4 className="text-xl font-black mb-1">{name || "Your Name"}</h4>
                            <p className="text-peacock-gold/70 text-sm font-bold mb-6">Author Partner</p>
                            <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-widest uppercase">
                                {profile.isActive ? "Account Active" : "Pending Activation"}
                            </div>
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-peacock-gold/10 rounded-full blur-3xl"></div>
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                    </div>

                    {/* Security Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-peacock-medium/10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xl">🔐</span>
                            <h3 className="text-xl font-bold text-peacock-navy">Security</h3>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => handleRequest("PASSWORD_RESET")}
                                disabled={requestLoading}
                                className="w-full py-3 rounded-xl border-2 border-peacock-medium/20 text-peacock-navy font-bold hover:bg-peacock-medium/5 transition disabled:opacity-50"
                            >
                                Request Password Reset
                            </button>
                            <div className="pt-6 border-t border-gray-100">
                                <label className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Change Email Address</label>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        id="new-email-input"
                                        placeholder="New email address"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-peacock-medium outline-none text-sm transition bg-gray-50/50"
                                    />
                                    <button
                                        onClick={() => {
                                            const input = document.getElementById("new-email-input") as HTMLInputElement;
                                            if (input.value) handleRequest("EMAIL_CHANGE", input.value);
                                        }}
                                        disabled={requestLoading}
                                        className="w-full py-3 bg-peacock-navy text-white rounded-xl text-sm font-black hover:bg-peacock-medium transition shadow-lg active:scale-95 disabled:opacity-50"
                                    >
                                        Submit Change Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
