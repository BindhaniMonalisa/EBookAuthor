"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function BookResources() {
    const router = useRouter();
    const [books, setBooks] = useState<any[]>([]);
    const [selectedBookId, setSelectedBookId] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [extraImages, setExtraImages] = useState<string[]>([]);
    const [documents, setDocuments] = useState<{ label: string; url: string }[]>([]);

    const [newImageUrl, setNewImageUrl] = useState("");
    const [newDocLabel, setNewDocLabel] = useState("");
    const [newDocUrl, setNewDocUrl] = useState("");

    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);

    const imageFileRef = useRef<HTMLInputElement>(null);
    const pdfFileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch("/api/books");
                const result = await res.json();
                if (result.success) {
                    setBooks(result.data);
                }
            } catch (err) {
                setError("Failed to fetch books");
            } finally {
                setFetching(false);
            }
        };
        fetchBooks();
    }, []);

    const handleBookChange = (id: string) => {
        setSelectedBookId(id);
        const book = books.find(b => b._id === id);
        if (book) {
            setExtraImages(book.extraImages || []);
            setDocuments(book.documents || []);
        } else {
            setExtraImages([]);
            setDocuments([]);
        }
        setError("");
        setSuccess("");
    };

    // --- Image handling ---
    const addImage = () => {
        if (!newImageUrl) return;
        setExtraImages([...extraImages, newImageUrl]);
        setNewImageUrl("");
    };

    const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingImage(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const result = await res.json();
            if (result.success) {
                setExtraImages([...extraImages, result.data.url]);
            } else {
                setError(result.message || "Image upload failed");
            }
        } catch (err) {
            setError("Image upload failed");
        } finally {
            setUploadingImage(false);
            if (imageFileRef.current) imageFileRef.current.value = "";
        }
    };

    const removeImage = (index: number) => {
        setExtraImages(extraImages.filter((_, i) => i !== index));
    };

    // --- Document handling ---
    const addDocument = () => {
        if (!newDocLabel || !newDocUrl) return;
        setDocuments([...documents, { label: newDocLabel, url: newDocUrl }]);
        setNewDocLabel("");
        setNewDocUrl("");
    };

    const handlePdfFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!newDocLabel) {
            setError("Please enter a document label before uploading a PDF file");
            if (pdfFileRef.current) pdfFileRef.current.value = "";
            return;
        }
        setUploadingPdf(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const result = await res.json();
            if (result.success) {
                setDocuments([...documents, { label: newDocLabel, url: result.data.url }]);
                setNewDocLabel("");
            } else {
                setError(result.message || "PDF upload failed");
            }
        } catch (err) {
            setError("PDF upload failed");
        } finally {
            setUploadingPdf(false);
            if (pdfFileRef.current) pdfFileRef.current.value = "";
        }
    };

    const removeDocument = (index: number) => {
        setDocuments(documents.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!selectedBookId) {
            setError("Please select a book first");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch(`/api/books/${selectedBookId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    extraImages,
                    documents
                }),
            });

            const result = await res.json();
            if (result.success) {
                setSuccess("Resources updated successfully!");
                setBooks(books.map(b => b._id === selectedBookId ? { ...b, extraImages, documents } : b));
            } else {
                setError(result.message || "Failed to update resources");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-peacock-navy">Add Book Resources</h1>
                <p className="text-gray-500">Attach extra images and PDF documents to your published books.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-peacock-medium/10 p-8 space-y-8">
                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm flex items-center gap-2">
                        <span>✅</span> {success}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select SKU</label>
                    <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                        value={selectedBookId}
                        onChange={(e) => handleBookChange(e.target.value)}
                        disabled={fetching}
                    >
                        <option value="">-- Choose a SKU --</option>
                        {books.map(book => (
                            <option key={book._id} value={book._id}>{book.sku} — {book.title}</option>
                        ))}
                    </select>
                </div>

                {/* Extra Images Section */}
                <div className="border-t pt-8">
                    <h2 className="text-xl font-bold text-peacock-navy mb-4">Extra Images</h2>

                    {/* Paste URL */}
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Paste Image URL"
                            className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={addImage}
                            className="bg-peacock-navy text-white px-6 rounded-xl font-bold hover:bg-opacity-90 transition"
                        >
                            Add
                        </button>
                    </div>

                    {/* Upload from folder */}
                    <div className="mb-4">
                        <input
                            type="file"
                            ref={imageFileRef}
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="hidden"
                            id="image-file-upload"
                        />
                        <label
                            htmlFor="image-file-upload"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-peacock-medium/30 text-peacock-medium font-semibold text-sm cursor-pointer hover:bg-peacock-medium/5 transition ${uploadingImage ? "opacity-50 pointer-events-none" : ""}`}
                        >
                            {uploadingImage ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-peacock-medium/30 border-t-peacock-medium rounded-full animate-spin"></span>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    📁 Upload Image from Folder
                                </>
                            )}
                        </label>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {extraImages.map((src, index) => (
                            <div key={index} className="relative group rounded-xl overflow-hidden border">
                                <img src={src} alt={`Extra ${index}`} className="w-full h-32 object-cover" />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PDF Documents Section */}
                <div className="border-t pt-8">
                    <h2 className="text-xl font-bold text-peacock-navy mb-4">PDF Documents</h2>

                    {/* Label input (shared by URL paste and file upload) */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Document Label (e.g. Chapter 1 Preview)"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                            value={newDocLabel}
                            onChange={(e) => setNewDocLabel(e.target.value)}
                        />
                    </div>

                    {/* Paste URL */}
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Paste PDF URL"
                            className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:border-peacock-medium outline-none transition"
                            value={newDocUrl}
                            onChange={(e) => setNewDocUrl(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={addDocument}
                            className="bg-peacock-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition"
                        >
                            Add
                        </button>
                    </div>

                    {/* Upload from folder */}
                    <div className="mb-4">
                        <input
                            type="file"
                            ref={pdfFileRef}
                            accept=".pdf,application/pdf"
                            onChange={handlePdfFileUpload}
                            className="hidden"
                            id="pdf-file-upload"
                        />
                        <label
                            htmlFor="pdf-file-upload"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-peacock-medium/30 text-peacock-medium font-semibold text-sm cursor-pointer hover:bg-peacock-medium/5 transition ${uploadingPdf ? "opacity-50 pointer-events-none" : ""}`}
                        >
                            {uploadingPdf ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-peacock-medium/30 border-t-peacock-medium rounded-full animate-spin"></span>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    📁 Upload PDF from Folder
                                </>
                            )}
                        </label>
                        {!newDocLabel && (
                            <p className="text-xs text-gray-400 mt-1">Enter a document label above before uploading a PDF file.</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        {documents.map((doc, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border">
                                <div>
                                    <span className="font-bold text-peacock-navy">{doc.label}</span>
                                    <p className="text-xs text-gray-400 line-clamp-1">{doc.url}</p>
                                </div>
                                <button
                                    onClick={() => removeDocument(index)}
                                    className="text-red-500 hover:text-red-700 font-bold"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-8 border-t flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading || !selectedBookId}
                        className="px-10 py-4 rounded-xl font-bold peacock-gradient text-white shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Saving Changes..." : "Save Resources"}
                    </button>
                </div>
            </div>
        </div>
    );
}
