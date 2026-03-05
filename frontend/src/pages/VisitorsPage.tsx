import React from "react";
import Card from "../components/Card";

type Visitor = {
  id: number;
  name: string;
  purpose: string;
  date: string; // ISO
  timeIn: string;
  timeOut: string;
  notes?: string;
};

const initialData: Visitor[] = [
  {
    id: 1,
    name: "Mr. John Smith",
    purpose: "Donation",
    date: "2026-03-05",
    timeIn: "10:00",
    timeOut: "10:45",
    notes: "Brought books",
  },
  {
    id: 2,
    name: "Ms. Aisha Patel",
    purpose: "Family Visit",
    date: "2026-03-05",
    timeIn: "11:30",
    timeOut: "12:15",
    notes: "Visited Lina",
  },
];

const VisitorsPage: React.FC = () => {
  const [visitors, setVisitors] = React.useState<Visitor[]>(initialData);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Visitor | null>(null);

  // search/sort/pagination
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortKey, setSortKey] = React.useState<keyof Visitor | null>(null);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const [form, setForm] = React.useState({
    name: "",
    purpose: "",
    date: "",
    timeIn: "",
    timeOut: "",
    notes: "",
  });

  function openAdd() {
    setEditing(null);
    setForm({
      name: "",
      purpose: "",
      date: "",
      timeIn: "",
      timeOut: "",
      notes: "",
    });
    setModalOpen(true);
  }

  function openEdit(visitor: Visitor) {
    setEditing(visitor);
    setForm({
      name: visitor.name,
      purpose: visitor.purpose,
      date: visitor.date,
      timeIn: visitor.timeIn,
      timeOut: visitor.timeOut,
      notes: visitor.notes || "",
    });
    setModalOpen(true);
  }

  function save() {
    const name = form.name.trim();
    const purpose = form.purpose.trim();
    const date = form.date;
    const timeIn = form.timeIn;
    const timeOut = form.timeOut;
    const notes = form.notes;
    if (!name || !purpose || !date || !timeIn) return;

    if (editing) {
      setVisitors((prev) =>
        prev.map((v) =>
          v.id === editing.id
            ? { ...v, name, purpose, date, timeIn, timeOut, notes }
            : v,
        ),
      );
    } else {
      const nextId = visitors.length ? Math.max(...visitors.map((v) => v.id)) + 1 : 1;
      setVisitors((prev) => [
        ...prev,
        {
          id: nextId,
          name,
          purpose,
          date,
          timeIn,
          timeOut,
          notes,
        },
      ]);
    }
    setModalOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={openAdd}
          className="inline-flex items-center px-4 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 cursor-pointer"
        >
          Add Visitor Log
        </button>
      </div>

      <div className="w-full">
        <Card title="Visitor Logs">
          {/* search and pagination controls */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="border rounded px-3 py-1 w-full sm:w-64"
            />
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">Page {page}</span>
              <button
                disabled={page * pageSize >= visitors.length}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left px-3 py-2 text-gray-600">
              <thead>
                <tr className="border-t bg-taupe-200">
                  <th className="px-3 py-1">Sn</th>
                  {[
                    "name",
                    "purpose",
                    "date",
                    "timeIn",
                    "timeOut",
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        if (sortKey === key) setSortAsc(!sortAsc);
                        else {
                          setSortKey(key as keyof Visitor);
                          setSortAsc(true);
                        }
                      }}
                    >
                      {key === "name"
                        ? "Name"
                        : key === "purpose"
                        ? "Purpose"
                        : key === "date"
                        ? "Date"
                        : key === "timeIn"
                        ? "Time In"
                        : key === "timeOut"
                        ? "Time Out"
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                      {sortKey === key && (sortAsc ? " ▲" : " ▼")}
                    </th>
                  ))}
                  <th className="px-3 py-1">Note</th>
                  <th className="px-3 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  // filter
                  let list = visitors.filter((v) =>
                    [v.name, v.purpose, v.date]
                      .join(" ")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  );
                  // sort
                  if (sortKey) {
                    list = [...list].sort((a, b) => {
                      const av = a[sortKey] || "";
                      const bv = b[sortKey] || "";
                      if (av < bv) return sortAsc ? -1 : 1;
                      if (av > bv) return sortAsc ? 1 : -1;
                      return 0;
                    });
                  }
                  // paginate
                  const start = (page - 1) * pageSize;
                  list = list.slice(start, start + pageSize);
                  return list;
                })().map((v, idx) => (
                  <tr key={v.id} className="border-t">
                    <td className="px-3 py-1">{idx + 1}</td>
                    <td className="px-3 py-1">{v.name}</td>
                    <td className="px-3 py-1">{v.purpose}</td>
                    <td className="px-3 py-1">{v.date}</td>
                    <td className="px-3 py-1">{v.timeIn}</td>
                    <td className="px-3 py-1">{v.timeOut}</td>
                    <td className="px-3 py-1">{v.notes || "-"}</td>
                    <td className="px-3 py-1">
                      <button
                        onClick={() => openEdit(v)}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 mr-2 cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-lg shadow p-6 z-10">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Visitor Log" : "Add Visitor Log"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Purpose</label>
                <input
                  value={form.purpose}
                  onChange={(e) => setForm((s) => ({ ...s, purpose: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Time In</label>
                  <input
                    type="time"
                    value={form.timeIn}
                    onChange={(e) => setForm((s) => ({ ...s, timeIn: e.target.value }))}
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Time Out</label>
                  <input
                    type="time"
                    value={form.timeOut}
                    onChange={(e) => setForm((s) => ({ ...s, timeOut: e.target.value }))}
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700">Notes</label>
                <input
                  value={form.notes}
                  onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorsPage;
