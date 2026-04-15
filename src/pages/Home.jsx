import React from 'react';
import EmployeeCard from '../components/EmployeeCard';

const Home = ({ employees, setSearchTerm, visibleCount, loading, debouncedSearch }) => {
  
  const filteredData = employees
    .filter((u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )
    .slice(0, visibleCount);

  return (
    <>
      <header className="pt-20 pb-14 px-6 text-center relative">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
          Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">Expert Team</span>
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
          <div className="text-center opacity-20 animate-pulse uppercase tracking-tighter">Fetching...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredData.map((emp, i) => (
              <EmployeeCard key={emp.id} emp={emp} index={i} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;