import React from "react";

// Dummy data for grid and bar chart
const gridData = [
  { category: "Food", amount: 1200 },
  { category: "Utilities", amount: 800 },
  { category: "Salaries", amount: 3000 },
  { category: "Supplies", amount: 600 },
];

const barColors = ["#06b6d4", "#f59e42", "#4ade80", "#f87171"];

const exportGrid = () => {
  // Simple CSV export
  const csv = [
    "Category,Amount",
    ...gridData.map((row) => `${row.category},${row.amount}`),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "report.csv";
  a.click();
  URL.revokeObjectURL(url);
};

const ReportPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Reports</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Grid Report */}
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Grid Report</h2>
            <button
              onClick={exportGrid}
              className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700"
            >
              Export
            </button>
          </div>
          <table className="min-w-full table-auto text-left text-gray-600">
            <thead>
              <tr className="border-t bg-taupe-200">
                <th className="px-3 py-1">Category</th>
                <th className="px-3 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {gridData.map((row, idx) => (
                <tr key={row.category} className="border-t">
                  <td className="px-3 py-1">{row.category}</td>
                  <td className="px-3 py-1">${row.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar Graph Report */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Bar Graph Report</h2>
          <div className="w-full h-64 flex items-end gap-4">
            {gridData.map((row, idx) => {
              const max = Math.max(...gridData.map((r) => r.amount));
              const height = (row.amount / max) * 200;
              return (
                <div key={row.category} className="flex flex-col items-center flex-1">
                  <div
                    style={{ height: `${height}px`, background: barColors[idx % barColors.length] }}
                    className="w-10 rounded-t"
                    title={row.amount.toString()}
                  ></div>
                  <span className="mt-2 text-xs text-gray-700">{row.category}</span>
                  <span className="text-xs text-gray-500">${row.amount}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
