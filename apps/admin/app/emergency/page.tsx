"use client";

import { useState } from "react";

export default function EmergencyPage() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function toggleEmergencyMode(enable: boolean) {
    setLoading(true);
    try {
      const res = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: enable }),
      });

      if (res.ok) {
        setEmergencyMode(enable);
      } else {
        console.error("Failed to toggle emergency mode");
      }
    } catch (err) {
      console.error("Error toggling emergency mode:", err);
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  }

  function handleToggle() {
    if (!emergencyMode) {
      // Show confirmation before enabling
      setConfirmOpen(true);
    } else {
      // Disable immediately
      toggleEmergencyMode(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-suntimes-charcoal">
          Emergency Kill Switch
        </h1>
        <p className="text-gray-500 mt-1">
          Immediately pause all agent posts and replies
        </p>
      </div>

      {/* Warning banner when active */}
      {emergencyMode && (
        <div className="bg-red-50 border-2 border-suntimes-coral rounded-lg p-6">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-suntimes-coral flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <p className="text-xl font-bold text-suntimes-coral">
                EMERGENCY MODE ACTIVE
              </p>
              <p className="text-red-600 mt-1">
                All agent posts and replies are paused
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle area */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              emergencyMode ? "bg-suntimes-coral" : "bg-gray-200"
            } transition-colors`}
          >
            <svg
              className={`w-10 h-10 ${
                emergencyMode ? "text-white" : "text-gray-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>

          <div>
            <p className="text-lg font-semibold text-suntimes-charcoal">
              Emergency Mode is{" "}
              <span
                className={
                  emergencyMode ? "text-suntimes-coral" : "text-green-600"
                }
              >
                {emergencyMode ? "ON" : "OFF"}
              </span>
            </p>
            <p className="text-gray-500 text-sm mt-1 max-w-md">
              {emergencyMode
                ? "The system is currently paused. No automated tweets, replies, or chat responses will be sent."
                : "The system is running normally. Toggle this switch to immediately pause all automated activity."}
            </p>
          </div>

          {/* Big toggle button */}
          <button
            onClick={handleToggle}
            disabled={loading}
            className={`px-12 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              emergencyMode
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-suntimes-coral hover:bg-red-600 text-white"
            }`}
          >
            {loading
              ? "Processing..."
              : emergencyMode
              ? "Disable Emergency Mode"
              : "Enable Emergency Mode"}
          </button>

          {!emergencyMode && (
            <p className="text-xs text-gray-400">
              A confirmation dialog will appear before activation
            </p>
          )}
        </div>
      </div>

      {/* Status info */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-suntimes-charcoal">
            What does Emergency Mode do?
          </h2>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-suntimes-coral flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-sm text-gray-600">
              Pauses all automated Twitter replies and posts
            </p>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-suntimes-coral flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-sm text-gray-600">
              Stops the chat portal from generating new AI responses
            </p>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-suntimes-coral flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-sm text-gray-600">
              Halts all scheduled content generation and posting
            </p>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-gray-600">
              Admin dashboard remains fully accessible
            </p>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-gray-600">
              Database and venue data remain intact and accessible
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-suntimes-coral"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-suntimes-charcoal">
                Enable Emergency Mode?
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              This will immediately pause all automated agent activity including
              Twitter replies, chat responses, and scheduled posts. Are you sure
              you want to proceed?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => toggleEmergencyMode(true)}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-suntimes-coral rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Activating..." : "Yes, Enable Emergency Mode"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
