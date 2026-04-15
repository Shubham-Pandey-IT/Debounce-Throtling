import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeDetail = ({ employees }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // URL se ID lekar employee ka data filter karna
  const emp = employees.find((e) => e.id === parseInt(id));

  if (!emp) return <div className="text-white p-20 text-center uppercase tracking-widest opacity-30">Loading Profile...</div>;

  // Iframe Map URL (Dynamic City & State)
  const mapUrl = `https://maps.google.com/maps?q=${emp.address.city},${emp.address.state}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-12 font-[Sora,sans-serif]">
      <button onClick={() => navigate('/')} className="mb-10 text-white/40 hover:text-white transition-all flex items-center gap-2">
        <span>←</span> Back to Directory
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info Card */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-md">
          <h1 className="text-4xl font-black mb-2">{emp.firstName} {emp.lastName}</h1>
          <p className="text-violet-400 font-bold mb-8 uppercase tracking-widest text-sm">{emp.company.title}</p>
          
          <div className="space-y-6 text-white/60">
            <div>
              <p className="text-[10px] text-white/30 uppercase font-bold mb-1">Email Address</p>
              <p className="text-sm font-medium">{emp.email}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase font-bold mb-1">Office Location</p>
              <p className="text-sm font-medium">{emp.address.city}, {emp.address.state}</p>
            </div>
          </div>
        </div>

        {/* Map Section - Normal (Light) View */}
        <div className="rounded-[2.5rem] p-2 overflow-hidden border border-white/10 h-125 shadow-2xl bg-white">
          <iframe 
            title="map" 
            width="100%" 
            height="100%" 
            src={mapUrl} 
            frameBorder="0" 
            className="w-full h-full" // Yahan se filter hata diye hain
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;