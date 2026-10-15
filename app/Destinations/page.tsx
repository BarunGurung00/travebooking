import Link from 'next/link';
import {
  Mountain,
  Globe,
} from "lucide-react";

export const metadata = {
  title: 'Top Destinations in Nepal | MyHimalayanTrip',
  description: 'Explore popular travel regions across Nepal from Everest to Pokhara.',
};

export default function DestinationsPage() {
  return (
      <div className="min-h-screen flex flex-col bg-white text-slate-900">

        {/* 1. HEADER */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center text-white font-black shadow-sm">
                <Mountain className="w-5 h-5" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">My</span>
                <span className="bg-sky-600 text-white font-black text-lg px-2.5 py-0.5 rounded-lg italic mx-1 shadow-xs">
                  Himalayan
                </span>
                <span className="text-xl font-extrabold text-slate-900 tracking-tight mr-1.5">Trip</span>
                <span className="text-xs font-black text-sky-600 italic -ml-1">.com</span>
              </div>
            </Link>
  
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
                <Globe className="w-4 h-4 text-slate-500" />
                <span>NPR / USD</span>
              </button>
              <div className="flex items-center cursor-pointer p-0.5 rounded-full border-2 border-sky-600 shadow-xs overflow-hidden hover:opacity-95 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="User Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900">Explore Nepal Destinations</h1>
          <p className="text-gray-600 mt-2">Discover popular regions, valleys, and heritage hubs.</p>
          
          {/* Grid container for region cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Placeholder region card */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-bold text-gray-900">Everest Region (Khumbu)</h2>
              <p className="text-sm text-gray-500 mt-1">Home to Mt. Everest, Sherpa culture, and alpine lakes.</p>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
         <p>
           &copy; {new Date().getFullYear()} MyHimalayanTrip.com All rights reserved. Built
           for travelers across the Himalayas.
         </p>
        </footer>

      </div>  
  );
}