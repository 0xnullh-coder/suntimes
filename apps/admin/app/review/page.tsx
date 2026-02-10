"use client";

import { useState } from "react";

interface ReviewItem {
  id: number;
  originalTweet: string;
  draftResponse: string;
  flagReason: string;
  status: "pending" | "approved" | "rejected";
}

export default function ReviewQueuePage() {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);

  function handleApprove(id: number) {
    setReviewItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "approved" as const } : item
      )
    );
    console.log("Approved item:", id);
  }

  function handleEdit(id: number) {
    console.log("Edit item:", id);
  }

  function handleReject(id: number) {
    setReviewItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "rejected" as const } : item
      )
    );
    console.log("Rejected item:", id);
  }

  function handleBlock(id: number) {
    console.log("Block user for item:", id);
  }

  function getStatusBadge(status: ReviewItem["status"]) {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-suntimes-charcoal">
          Review Queue
        </h1>
        <p className="text-gray-500 mt-1">
          Review and moderate flagged tweet responses
        </p>
      </div>

      {reviewItems.length === 0 ? (
        /* Empty state */
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-suntimes-charcoal mb-2">
            No flagged tweets to review
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            All tweet responses have been reviewed. New flagged items will appear
            here when the system detects potentially sensitive content.
          </p>
        </div>
      ) : (
        /* Review table */
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Original Tweet
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Draft Response
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Flag Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviewItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-suntimes-charcoal max-w-xs">
                    <p className="truncate">{item.originalTweet}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <p className="truncate">{item.draftResponse}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.flagReason}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="px-3 py-1.5 bg-suntimes-teal text-white text-xs font-medium rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-3 py-1.5 bg-suntimes-coral text-white text-xs font-medium rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleBlock(item.id)}
                        className="px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-md hover:bg-gray-900 transition-colors"
                      >
                        Block
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
