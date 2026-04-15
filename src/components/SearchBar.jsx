import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="max-w-xl mx-auto relative">
      <div className="absolute inset-0 rounded-2xl bg-violet-500/10 blur-xl pointer-events-none" />

      <div
        className="relative flex items-center bg-white/6 border border-white/10 rounded-2xl overflow-hidden
                      backdrop-blur-md hover:border-violet-500/40 focus-within:border-violet-500/60
                      focus-within:bg-white/9 transition-all duration-300"
      >
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
          placeholder="Search by name (with Debounce logic)..."
          className="w-full py-4 px-4 bg-transparent outline-none text-white/80 text-sm font-medium
                     placeholder:text-white/25 tracking-wide"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
