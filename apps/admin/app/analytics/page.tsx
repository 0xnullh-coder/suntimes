"use client";

const statsCards = [
  { label: "Replies Today", value: "47", change: "+12%", positive: true },
  { label: "Chat Queries Today", value: "183", change: "+8%", positive: true },
  { label: "LLM Cost Today", value: "$2.34", change: "-5%", positive: true },
  { label: "LLM Cost This Month", value: "$67.82", change: "+15%", positive: false },
];

const modelBreakdown = [
  { model: "Haiku", percentage: 72, count: 1284, color: "bg-suntimes-teal" },
  { model: "Sonnet", percentage: 28, count: 499, color: "bg-suntimes-gold" },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-suntimes-charcoal">Analytics</h1>
        <p className="text-gray-500 mt-1">Usage statistics and cost tracking</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <div className="flex items-end gap-2 mt-2">
              <p className="text-3xl font-bold text-suntimes-charcoal">
                {stat.value}
              </p>
              <span
                className={`text-sm font-medium mb-1 ${
                  stat.positive ? "text-green-600" : "text-suntimes-coral"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Usage Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-suntimes-charcoal">
              Model Usage Breakdown
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Distribution of LLM calls by model (this month)
            </p>
          </div>
          <div className="p-6 space-y-6">
            {modelBreakdown.map((model) => (
              <div key={model.model} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-suntimes-charcoal">
                    {model.model}
                  </span>
                  <span className="text-sm text-gray-500">
                    {model.percentage}% ({model.count.toLocaleString()} calls)
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${model.color} h-3 rounded-full transition-all`}
                    style={{ width: `${model.percentage}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Total calls this month</span>
                <span className="font-semibold text-suntimes-charcoal">
                  {modelBreakdown
                    .reduce((sum, m) => sum + m.count, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts placeholder */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-suntimes-charcoal">
              Usage Over Time
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Daily request volume and cost trends
            </p>
          </div>
          <div className="p-6 flex items-center justify-center h-64">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-gray-300 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-gray-400 font-medium">Charts coming soon</p>
              <p className="text-gray-400 text-sm mt-1">
                Interactive visualizations will be added here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional metrics */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-suntimes-charcoal">
            Cost Summary
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Calls Today
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Input Tokens
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Output Tokens
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Cost Today
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-suntimes-charcoal">
                  Haiku 3.5
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">165</td>
                <td className="px-6 py-4 text-sm text-gray-600">412,000</td>
                <td className="px-6 py-4 text-sm text-gray-600">89,000</td>
                <td className="px-6 py-4 text-sm text-gray-600">$0.62</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-suntimes-charcoal">
                  Sonnet 3.5
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">65</td>
                <td className="px-6 py-4 text-sm text-gray-600">198,000</td>
                <td className="px-6 py-4 text-sm text-gray-600">52,000</td>
                <td className="px-6 py-4 text-sm text-gray-600">$1.72</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
