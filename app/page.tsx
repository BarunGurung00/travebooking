"use client";

import { useState } from "react";
import Link from "next/link";
import { Bus, Hotel, Plane, Calendar, MapPin, ArrowRight, ShieldCheck, Headphones, Sparkles } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"bus" | "hotel" | "flight">("bus");

  // Search form states
  const [origin, setOrigin] = useState("Kathmandu");
  const [destination, setDestination] = useState("Pokhara");
  const [date, setDate] = useState("2026-04-10");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white font-black text-xl px-3 py-1.5 rounded-xl tracking-wider">
              Trip
            </span>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Booking</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/bus" className="text-blue-600 font-semibold flex items-center gap-1.5">
              <Bus className="w-4 h-4" /> Buses
            </Link>
            <span className="text-gray-400 flex items-center gap-1.5 cursor-not-allowed">
              <Hotel className="w-4 h-4" /> Hotels <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">Soon</span>
            </span>
            <span className="text-gray-400 flex items-center gap-1.5 cursor-not-allowed">
              <Plane className="w-4 h-4" /> Flights <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">Soon</span>
            </span>
          </nav>

          <div>
            <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
              Login / Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO BANNER & SEARCH WIDGET SECTION */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Explore Nepal, Seamlessly Booked.
          </h1>
          <p className="text-blue-200 text-base sm:text-lg max-w-2xl mx-auto">
            Your ultimate travel companion for tourist buses across Kathmandu, Pokhara, Chitwan, and beyond.
          </p>
        </div>

        {/* SEARCH WIDGET CARD */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 text-gray-900">
          
          {/* TABS HEADER */}
          <div className="flex border-b border-gray-200 pb-4 mb-6 gap-6">
            <button
              onClick={() => setActiveTab("bus")}
              className={`flex items-center gap-2 pb-2 font-bold text-sm border-b-2 transition-all ${
                activeTab === "bus"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Bus className="w-5 h-5" /> Tourist Buses
            </button>
            <button
              onClick={() => setActiveTab("hotel")}
              className={`flex items-center gap-2 pb-2 font-bold text-sm border-b-2 transition-all ${
                activeTab === "hotel"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Hotel className="w-5 h-5" /> Hotels <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">Coming Soon</span>
            </button>
            <button
              onClick={() => setActiveTab("flight")}
              className={`flex items-center gap-2 pb-2 font-bold text-sm border-b-2 transition-all ${
                activeTab === "flight"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Plane className="w-5 h-5" /> Flights <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">Coming Soon</span>
            </button>
          </div>

          {/* ACTIVE TAB CONTENT */}
          {activeTab === "bus" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Pokhara">Pokhara</option>
                    <option value="Chitwan">Chitwan</option>
                    <option value="Lumbini">Lumbini</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Pokhara">Pokhara</option>
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Chitwan">Chitwan</option>
                    <option value="Lumbini">Lumbini</option>
                    <option value="Bardia">Bardia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Travel Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="md:col-span-3 mt-2">
                <Link
                  href="/bus"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-lg"
                >
                  Search Tourist Buses <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-bounce" />
              <h3 className="text-xl font-bold text-gray-800 capitalize">{activeTab} Booking is Launching Soon!</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
                We are currently focusing on delivering the absolute best tourist bus ticketing experience in Nepal. Hotels and flights will be added shortly after!
              </p>
              <button
                onClick={() => setActiveTab("bus")}
                className="mt-6 bg-blue-50 text-blue-600 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-100 transition-colors"
              >
                Book Tourist Buses Instead
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 3. POPULAR ROUTES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Tourist Routes in Nepal</h2>
          <p className="text-gray-500 text-sm mt-1">Handpicked routes traveled by thousands of tourists daily</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">Top Route</span>
            <h3 className="text-xl font-bold text-gray-900 mt-4">Kathmandu &rarr; Pokhara</h3>
            <p className="text-sm text-gray-500 mt-1">Scenic highway journey through hills & rivers. VIP Sofa & Deluxe options available.</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">From NPR 1,200</span>
              <Link href="/bus" className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                Book Now &rarr;
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">Wildlife Safari</span>
            <h3 className="text-xl font-bold text-gray-900 mt-4">Kathmandu &rarr; Chitwan</h3>
            <p className="text-sm text-gray-500 mt-1">Head south to Sauraha for jungle safaris and rhino spotting. Comfortable tourist micro/buses.</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">From NPR 900</span>
              <Link href="/bus" className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                Book Now &rarr;
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-bold bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full">Heritage Trail</span>
            <h3 className="text-xl font-bold text-gray-900 mt-4">Kathmandu &rarr; Lumbini</h3>
            <p className="text-sm text-gray-500 mt-1">Journey to the birthplace of Lord Buddha with reliable overnight and daytime tourist coaches.</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">From NPR 1,400</span>
              <Link href="/bus" className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                Book Now &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST & FEATURES FOOTER BAR */}
      <section className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Verified Operators</h4>
              <p className="text-xs text-gray-500">Partnered with top-rated tourist bus companies.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">24/7 Local Support</h4>
              <p className="text-xs text-gray-500">Always here to help you on your highway journey.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Instant QR Tickets</h4>
              <p className="text-xs text-gray-500">Get digital tickets instantly on your phone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Trip Booking Nepal. Built for travelers across the Nepal and beyond.</p>
      </footer>

    </div>
  );
}