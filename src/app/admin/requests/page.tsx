"use client";

import { useState, useEffect } from "react";

export default function AdminRequests() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const res = await fetch("/api/admin/requests");
            const result = await res.json();
            if (result.success) {
                setRequests(result.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
        try {
            const res = await fetch(`/api/admin/requests/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const result = await res.json();
            if (result.success) {
                if (result.data.tempPassword) {
                    alert(`Approved! Temporary Password: ${result.data.tempPassword}`);
                }
                fetchRequests();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-peacock-navy">Author Requests</h1>
                <p className="text-gray-500">Review and act on sensitive account change requests.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-peacock-medium/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-peacock-bg uppercase text-xs font-black text-gray-400">
                            <tr>
                                <th className="px-8 py-6">Author</th>
                                <th className="px-8 py-6">Request Type</th>
                                <th className="px-8 py-6">Details</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-10">Loading requests...</td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-gray-400">No pending requests.</td>
                                </tr>
                            ) : requests.map((req) => (
                                <tr key={req._id}>
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-peacock-navy">{req.authorId?.name}</div>
                                        <div className="text-xs text-gray-400">{req.authorId?.email}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${req.requestType === "EMAIL_CHANGE" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                                            }`}>
                                            {req.requestType}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm">
                                        {req.requestType === "EMAIL_CHANGE" ? (
                                            <div>Change to: <span className="font-bold">{req.newEmail}</span></div>
                                        ) : (
                                            <div className="text-gray-400 italic">Credential reset requested</div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button
                                            onClick={() => handleAction(req._id, "APPROVED")}
                                            className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:shadow-lg transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(req._id, "REJECTED")}
                                            className="px-4 py-2 border border-red-200 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 transition"
                                        >
                                            Reject
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
