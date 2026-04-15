import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDebounce } from "./hooks/useDebounce";
import { useThrottle } from "./hooks/useThrottle";
import Home from "./pages/Home";
import EmployeeDetail from "./pages/EmployeeDetail";
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
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Infinite Scroll Logic (Throttle)
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

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0f] text-white font-[Sora,sans-serif]">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                employees={employees}
                setSearchTerm={setSearchTerm}
                visibleCount={visibleCount}
                loading={loading}
                debouncedSearch={debouncedSearch}
              />
            }
          />
          <Route
            path="/employee/:id"
            element={<EmployeeDetail employees={employees} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
