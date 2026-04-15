import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const EmployeeCard = ({ emp, index = 0 }) => {
  const navigate = useNavigate(); 
  // 6 alag color themes — har card ko ek unique accent color milta hai
  // ring = border color, bg = background tint, text = icon/badge text color
  const colorSets = [
    { ring: "#7c3aed", bg: "rgba(124,58,237,0.15)", text: "#a78bfa" },
    { ring: "#0891b2", bg: "rgba(8,145,178,0.15)", text: "#67e8f9" },
    { ring: "#059669", bg: "rgba(5,150,105,0.15)", text: "#6ee7b7" },
    { ring: "#d97706", bg: "rgba(217,119,6,0.15)", text: "#fcd34d" },
    { ring: "#db2777", bg: "rgba(219,39,119,0.15)", text: "#f9a8d4" },
    { ring: "#4f46e5", bg: "rgba(79,70,229,0.15)", text: "#a5b4fc" },
  ];

  // index % 6 — agar 6 se zyada cards hain toh colors repeat hote hain (0,1,2,3,4,5,0,1,2...)
  const color = colorSets[index % colorSets.length];

  return (
    <div
      className="group relative flex flex-col items-center p-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm
                 hover:border-white/20 hover:bg-white/9 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Avatar section */}
      <div className="relative mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center border-2"
          style={{ borderColor: color.ring, background: color.bg }}
        >
          <FaUserCircle style={{ color: color.text, fontSize: "42px" }} />
        </div>
        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#0a0a0f] rounded-full" />
      </div>

      <h3 className="text-[14px] font-bold text-white text-center leading-tight mb-1.5">
        {emp.firstName} {emp.lastName}
      </h3>
      <span
        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4"
        style={{ background: color.bg, color: color.text }}
      >
        {emp.company?.title ?? "Employee"}{" "}
      </span>
      <div className="w-full h-px bg-white/[0.07] mb-4" />

      <div className="w-full space-y-1.5 mb-4">
        <p className="flex items-center gap-2 text-[11px] text-white/40 truncate">
          <svg
            className="w-3 h-3 shrink-0 text-white/25"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="truncate">{emp.email}</span>
        </p>

        <p className="flex items-center gap-2 text-[11px] text-white/40">
          <svg
            className="w-3 h-3 shrink-0 text-white/25"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {emp.address?.city}, {emp.address?.state}
        </p>
      </div>

      <button
        onClick={() => navigate(`/employee/${emp.id}`)}
        className="w-full py-2.5 rounded-xl text-xs font-bold tracking-wide border border-white/10 text-white/60
                         hover:text-white hover:border-white/25 hover:bg-white/6 active:scale-95 transition-all duration-200"
      >
        View Profile →
      </button>
    </div>
  );
};

export default EmployeeCard;
