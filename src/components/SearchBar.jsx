import React from "react";

// onSearch = parent se aata hai, har keystroke pe call hoga (debounce App.jsx mein handle karta hai)
const SearchBar = ({ onSearch }) => {
  return (
    // Outer wrapper — max width limit aur relative positioning glow ke liye
    <div className="max-w-xl mx-auto relative">
      {/* Decorative glow div — actual input ke peeche blurred violet light effect
          pointer-events-none = clicks pass-through karta hai input tak */}
      <div className="absolute inset-0 rounded-2xl bg-violet-500/10 blur-xl pointer-events-none" />

      {/* Input container — glassmorphism card
          bg-white/[0.06]  = 6% white opacity (fix: bracket notation decimal ke liye)
          backdrop-blur-md = frosted glass look
          focus-within     = jab bhi andar ka input focus ho, parent pe style lagao */}
      <div
        className="relative flex items-center bg-white/6 border border-white/10 rounded-2xl overflow-hidden
                      backdrop-blur-md hover:border-violet-500/40 focus-within:border-violet-500/60
                      focus-within:bg-white/9 transition-all duration-300"
      >
        {/*                                  ^^^^^^
            fix: 0.9 tha pehle — wo 90% white kar deta tha focus pe, dark theme toot jaati
            correct value: 0.09 = sirf 9% — barely brighter, theme intact rehti */}

        {/* Search glass icon — left side pe, shrink-0 flex squeeze hone se rokta hai */}
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

        {/* Actual search input
            bg-transparent  = container ka glass bg dikhne deta hai
            onChange        = har character type hone pe onSearch call hoga
            debounce logic App.jsx mein — yahan sirf raw value bhejte hain */}
        <input
          type="text"
          placeholder="Search by name (with Debounce logic)..."
          className="w-full py-4 px-4 bg-transparent outline-none text-white/80 text-sm font-medium
                     placeholder:text-white/25 tracking-wide"
          onChange={(e) => onSearch(e.target.value)}
        />

        {/* ⌘K keyboard shortcut badge — purely decorative, right side pe
            shrink-0 = flex container mein squeeze nahi hoga
            actual ⌘K functionality attach karni ho toh useEffect mein keydown listener lagao */}
        <div className="flex items-center gap-1 mr-4 shrink-0">
          <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 text-white/30 text-[10px] font-bold border border-white/10">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 text-white/30 text-[10px] font-bold border border-white/10">
            K
          </kbd>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
