import Link from "next/link";
import DecorativeButterflies from "@/components/DecorativeButterflies";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 opacity-10 blur-3xl">
          <div className="absolute top-0 -left-10 w-[500px] h-[500px] bg-peacock-gold rounded-full"></div>
          <div className="absolute bottom-0 -right-10 w-[600px] h-[600px] bg-peacock-emerald rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mt-5">
            <div className="inline-block px-6 mt-10 py-2 rounded-full bg-peacock-gold/10 text-peacock-gold font-bold mb-8 tracking-wider uppercase text-sm border border-peacock-gold/20">
              The Artist's Gateway to Publishing
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] text-peacock-navy">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-peacock-medium to-peacock-gold">Literary</span> Journey
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed font-light">
              BookShelf is the premier destination for serious authors to manage their legacy and for readers to discover extraordinary stories.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/register" className="peacock-button text-xl px-10 py-5 group">
                Apply as Author
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/login" className="bg-white border-2 border-peacock-navy/10 text-peacock-navy px-10 py-5 rounded-full text-xl font-bold hover:border-peacock-gold/50 transition shadow-sm hover:shadow-md">
                Author Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Banner (KDP Style) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <div className="relative max-w-4xl text-center px-12">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[120px] font-light text-peacock-gold/20 leading-none h-fit">{"{"}</span>
            <p className="text-2xl md:text-3xl text-peacock-navy font-medium leading-relaxed">
              BookShelf provides you with free and simple tools to self-publish your book in more than 10 countries in over 45 languages.
            </p>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[120px] font-light text-peacock-gold/20 leading-none">{"}"}</span>
          </div>
        </div>
      </section>

      {/* Be Your Own Publisher Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="relative z-10 flex gap-4 -rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" className="w-48 h-72 object-cover rounded shadow-2xl" alt="Book 1" />
              <img src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-48 h-72 object-cover rounded shadow-2xl -mt-8" alt="Book 2" />
              <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300" className="w-48 h-72 object-cover rounded shadow-2xl mt-4" alt="Book 3" />
            </div>
            <div className="absolute -inset-10 bg-peacock-gold/5 blur-3xl rounded-full"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-8 text-peacock-navy">Be your own publisher</h2>
            <p className="text-lg text-gray-600 mb-8 font-light">
              BookShelf gives you control over your book's content, design, price, audience, and advertising.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-peacock-gold mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-peacock-navy">Self-publish easily</h4>
                  <p className="text-gray-500 text-sm">Publish print and digital formats in three simple steps, and see your book appear online in 72 hours.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-peacock-gold mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-peacock-navy">Earn more</h4>
                  <p className="text-gray-500 text-sm">Earn up to 70% royalty and offer your eBook on specialized channels.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-peacock-gold mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-peacock-navy">Keep control</h4>
                  <p className="text-gray-500 text-sm">Retain ownership of your content, publish on your schedule, and set your own list prices.</p>
                </div>
              </li>
            </ul>
            <div className="mt-12 flex gap-8 items-center">
              <Link href="/register" className="bg-peacock-gold text-white px-8 py-3 rounded-lg font-bold hover:bg-peacock-navy transition">Join BookShelf</Link>
              <Link href="/about" className="text-peacock-medium font-bold hover:underline">Learn how to publish</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 relative">
            <div className="relative z-10 bg-peacock-navy rounded-[40px] p-8 shadow-2xl max-w-sm mx-auto">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" className="w-full h-[500px] object-cover rounded-[20px]" alt="eReader" />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest mt-4">kindle</div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-peacock-medium/10 rounded-full blur-3xl"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-8 text-peacock-navy">Share your story</h2>
            <p className="text-lg text-gray-600 mb-8 font-light">
              Publish in different formats to reach more readers in their preferred way to read.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-peacock-gold mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-peacock-navy">eBooks</h4>
                  <p className="text-gray-500 text-sm">Upload your manuscript and distribute your eBook in stores around the world. Reach even more readers with Unlimited programs.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-peacock-gold mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-peacock-navy">Print books</h4>
                  <p className="text-gray-500 text-sm">Bring your book to life in paperback and hardcover formats. BookShelf will print your books on demand and ship them to customers globally.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Testimonial 1 */}
            <div className="text-center group">
              <div className="relative w-64 h-64 mx-auto mb-12">
                <div className="absolute top-0 right-0 w-48 h-48 bg-peacock-gold/60 rounded-full group-hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 border-2 border-peacock-gold rounded-full"></div>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300" className="absolute inset-0 w-full h-full object-cover rounded-full z-10 shadow-xl" alt="Author 1" />
              </div>
              <h4 className="text-2xl font-bold text-peacock-navy">Tricia O'Malley</h4>
              <p className="text-peacock-medium text-sm mb-6">USA / Romance</p>
              <p className="text-gray-600 italic leading-relaxed mb-6">
                "Self-publishing through BookShelf and Amazon has changed my life. My books have made it to the New York Times, USA Today, and Wall Street Journal bestseller lists."
              </p>
              <Link href="#" className="text-peacock-medium font-bold hover:underline">Visit Tricia O'Malley's author page</Link>
            </div>
            {/* Testimonial 2 */}
            <div className="text-center group">
              <div className="relative w-64 h-64 mx-auto mb-12">
                <div className="absolute top-0 left-0 w-48 h-48 bg-peacock-emerald/40 rounded-full group-hover:scale-110 transition-transform"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-peacock-light/30 rounded-full"></div>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" className="absolute inset-0 w-full h-full object-cover rounded-full z-10 shadow-xl" alt="Author 2" />
              </div>
              <h4 className="text-2xl font-bold text-peacock-navy">Jéssica Macedo</h4>
              <p className="text-peacock-medium text-sm mb-6">Brazil / Fantasy</p>
              <p className="text-gray-600 italic leading-relaxed mb-6">
                "I always dreamed of living off books, but it was something that seemed unattainable until I discovered BookShelf. With KDP, I gained readers in my country and even around the world."
              </p>
              <Link href="#" className="text-peacock-medium font-bold hover:underline">Visit Jéssica Macedo's author page</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Book Types Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 text-peacock-navy">Publish multiple types of books</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6 text-left max-w-5xl mx-auto">
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Business & Investing</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Children's Books</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Non-Fiction</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Literature & Fiction</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Mystery, Thriller & Suspense</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Science Fiction & Fantasy</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Teens & Young Adult</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Comics & Graphic Novels</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Biography</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Romance</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">Short Stories</span>
            <span className="text-gray-600 hover:text-peacock-gold transition cursor-default">...and more!</span>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm border-t border-gray-100 relative overflow-hidden">
        {/* Realistic Butterfly Shadows */}
        <DecorativeButterflies />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="w-24 h-1 bg-peacock-gold/30 mx-auto mb-16 rounded-full"></div>
          <h2 className="text-4xl font-bold mb-6 text-peacock-navy">Join our community of authors</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Have a question about your account or how to market your book? Ask for help from fellow publishers or lend a hand to someone new.
          </p>
          <Link href="/community" className="inline-block border-2 border-peacock-medium text-peacock-medium px-8 py-3 rounded-lg font-bold hover:bg-peacock-medium hover:text-white transition-all transform hover:scale-105 shadow-sm">
            Connect with experts and fellow authors
          </Link>
        </div>
      </section>

      {/* Ready to Publish Section (Final CTA) */}
      <section className="py-16 bg-gray-100/80 relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
          <h2 className="text-3xl font-bold text-peacock-navy">Ready to publish your book?</h2>
          <div className="flex items-center gap-8">
            <Link href="/register" className="bg-peacock-gold text-white px-10 py-3 rounded-lg font-black text-lg hover:bg-peacock-navy transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Join BookShelf
            </Link>
          </div>
          {/* Artistic Stick Figure SVG (KDP Style) */}
          <div className="hidden md:block absolute right-20 -bottom-4 opacity-40">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="30" r="15" stroke="currentColor" strokeWidth="2" className="text-peacock-navy" />
              <path d="M60 45V90M60 55L30 40M60 55L90 40M60 90L40 115M60 90L80 115" stroke="currentColor" strokeWidth="2" className="text-peacock-navy" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
