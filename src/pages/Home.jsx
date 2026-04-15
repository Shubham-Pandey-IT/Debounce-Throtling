import React from "react";
import EmployeeCard from "../components/EmployeeCard";

const Home = ({
  employees,
  setSearchTerm,
  visibleCount,
  loading,
  debouncedSearch,
}) => {
  const filteredData = employees
    .filter((u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
    )
    .slice(0, visibleCount);

  return (
    <>
      <header className="pt-20 pb-14 px-6 text-center relative">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
          Find Your{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">
            Expert Team
          </span>
        </h1>
        <p className="text-white/30 text-sm md:text-base font-medium mb-12 uppercase tracking-widest">
          Performance Optimized · {filteredData.length} Professionals
        </p>

        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-violet-500 transition-all backdrop-blur-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-28">
        {loading && employees.length === 0 ? (
          <div className="flex flex-col items-center mt-24 gap-5">
            <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
            <p className="text-white/30 text-sm font-medium tracking-widest uppercase animate-pulse">
              Fetching professionals...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredData.map((emp, i) => (
                <EmployeeCard key={emp.id} emp={emp} index={i} />
              ))}
            </div>

            {visibleCount < 30 ? (
              <div className="mt-16 text-center py-10 border-t border-white/5">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" />
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em]">
                    Scroll to load more
                  </span>
                </div>
              </div>
            ): (null)}
          </>
        )}
      </main>
    </>
  );
};

export default Home;
