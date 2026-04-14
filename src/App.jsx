import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "./hooks/useDebounce";
import { useThrottle } from "./hooks/useThrottle";
import EmployeeCard from "./components/EmployeeCard";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://dummyjson.com/users?limit=30");
        setEmployees(res.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleScroll = useThrottle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      if (visibleCount < 30) {
        setVisibleCount((prev) => prev + 6);
      }
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const filteredData = employees
    .filter((u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
    )
    .slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-[Sora,sans-serif] selection:bg-violet-800/40">
      {/* Header */}
      <header className="pt-20 pb-14 px-6 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/60 text-[11px] font-semibold tracking-[0.2em] uppercase">
            Performance Optimized · Debounce + Throttle
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-4">
          <span className="text-white">Find Your </span>
          <span
            className="relative inline-block"
            style={{ WebkitTextStroke: "1px rgba(139,92,246,0.6)" }}
          >
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #a78bfa, #818cf8, #c084fc)",
              }}
            >
              Expert Team
            </span>
            {/* Underline accent */}
            <span className="absolute -bottom-1 left-0 w-full h-px bg-linear-to-r from-violet-500 to-transparent" />
          </span>
        </h1>
        <p className="text-white/30 text-base md:text-lg font-medium mb-12 tracking-wide">
          30 professionals · scroll to explore
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <div className="absolute inset-0 rounded-2xl bg-violet-500/10 blur-xl" />
          <div className="relative flex items-center bg-white/0.06 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-violet-500/40 focus-within:border-violet-500/60 focus-within:bg-white/6 transition-all duration-300">
            <svg
              className="ml-5 shrink-0 w-4 h-4 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full py-4 px-4 bg-transparent outline-none text-white/80 text-sm font-medium placeholder:text-white/25 tracking-wide"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 pb-28">
        {loading ? (
          <div className="flex flex-col items-center mt-24 gap-5">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-violet-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
            <p className="text-white/30 text-sm font-medium tracking-widest uppercase animate-pulse">
              Fetching employees...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {filteredData.map((emp, i) => (
              <EmployeeCard key={emp.id} emp={emp} index={i} />
            ))}
          </div>
        )}

        {/* Footer */}
        {!loading && (
          <div className="mt-20 text-center flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/10" />
            <span className="text-white/25 text-xs font-semibold tracking-[0.2em] uppercase">
              {filteredData.length} of 30 results
            </span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
