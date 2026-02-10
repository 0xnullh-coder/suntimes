"use client";

import { useState } from "react";

const stats = [
  {
    label: "Total Venues",
    value: 50,
    color: "bg-suntimes-teal",
    textColor: "text-suntimes-teal",
  },
  {
    label: "Total Regions",
    value: 7,
    color: "bg-suntimes-gold",
    textColor: "text-suntimes-gold",
  },
  {
    label: "Total Events",
    value: 8,
    color: "bg-suntimes-coral",
    textColor: "text-suntimes-coral",
  },
  {
    label: "Olympics Updates",
    value: 5,
    color: "bg-purple-500",
    textColor: "text-purple-500",
  },
];

const recentActivity = [
  { action: "Venue added", detail: "Eiffel Tower added to Landmarks", time: "2 hours ago" },
  { action: "Tweet approved", detail: "Response to @tourist_paris approved", time: "3 hours ago" },
  { action: "Event updated", detail: "Olympics Opening Ceremony updated", time: "5 hours ago" },
  { action: "Region modified", detail: "Le Marais region boundaries updated", time: "1 day ago" },
  { action: "Venue verified", detail: "Cafe de Flore marked as verified", time: "1 day ago" },
];

export default function AdminDashboard() {
  const [emergencyMode] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-suntimes-charcoal">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of the Suntimes system</p>
      </div>

      {/* Alerts */}
      {emergencyMode ? (
        <div className="bg-red-50 border border-suntimes-coral rounded-lg p-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-suntimes-coral flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <p className="font-semibold text-suntimes-coral">EMERGENCY MODE ACTIVE</p>
            <p className="text-sm text-red-600">All agent posts and replies are paused. Go to Emergency page to manage.</p>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-300 rounded-lg p-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold text-green-800">System running normally</p>
            <p className="text-sm text-green-600">All services are operational.</p>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
              {stat.value}
            </p>
            <div className={`mt-3 h-1 w-12 rounded ${stat.color}`} />
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-suntimes-charcoal">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.map((item, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-suntimes-charcoal text-sm">
                  {item.action}
                </p>
                <p className="text-gray-500 text-sm">{item.detail}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-4">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
