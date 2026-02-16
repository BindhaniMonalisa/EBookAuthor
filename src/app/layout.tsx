import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "BookShelf | Multi-Author Book Platform",
  description: "A premium platform for authors to manage their literary works and for readers to discover new books.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col relative" suppressHydrationWarning>
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-40">
          <div className="absolute top-[5%] -left-[10%] w-[600px] h-[600px] bg-peacock-gold/30 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[15%] -right-[10%] w-[700px] h-[700px] bg-peacock-emerald/25 rounded-full blur-[160px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-peacock-light/15 rounded-full blur-[180px]"></div>
        </div>
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <footer className="bg-peacock-navy text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-4">BookShelf</h3>
            <p className="text-gray-400 mb-6">Empowering authors, inspiring readers.</p>
            <div className="flex justify-center space-x-6 mb-8">
              <span className="hover:text-peacock-gold cursor-pointer">Facebook</span>
              <span className="hover:text-peacock-gold cursor-pointer">Twitter</span>
              <span className="hover:text-peacock-gold cursor-pointer">Instagram</span>
            </div>
            <p className="text-sm text-gray-500">© 2026 BookShelf. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
