
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Admin: React.FC = () => {
  const data = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 500 },
    { name: 'Thu', value: 800 },
    { name: 'Fri', value: 650 },
    { name: 'Sat', value: 200 },
    { name: 'Sun', value: 150 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Admin Command Center</h2>
          <p className="text-gray-500">Library management and system health overview</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
            <i className="fas fa-plus mr-2"></i> Upload New E-Book
          </button>
          <button className="bg-white text-gray-700 px-6 py-2 rounded-xl border font-bold hover:bg-gray-50 transition">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Active Readers", value: "1,284", icon: "fa-users", color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Total E-Books", value: "48,512", icon: "fa-book", color: "text-green-500", bg: "bg-green-50" },
          { label: "Borrowed Today", value: "312", icon: "fa-arrow-up", color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Avg Reading Time", value: "42 min", icon: "fa-clock", color: "text-purple-500", bg: "bg-purple-50" },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <h4 className="text-3xl font-bold text-gray-800">{stat.value}</h4>
            <p className="text-sm text-gray-400 uppercase font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-8">Reading Trends (Last 7 Days)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h3>
          <div className="space-y-6">
            {[
              { user: "Sarah Miller", action: "uploaded a paper", time: "2 mins ago", icon: "fa-file-pdf", color: "bg-blue-50 text-blue-600" },
              { user: "Dr. K. Patel", action: "reserved 'Bio-Chem II'", time: "15 mins ago", icon: "fa-bookmark", color: "bg-green-50 text-green-600" },
              { user: "System", action: "catalog backup complete", time: "1 hr ago", icon: "fa-hdd", color: "bg-gray-50 text-gray-600" },
              { user: "Admin", action: "new user verification", time: "3 hrs ago", icon: "fa-user-check", color: "bg-purple-50 text-purple-600" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                  <i className={`fas ${activity.icon} text-sm`}></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">
                    <span className="text-gray-900">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition">
            View System Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
