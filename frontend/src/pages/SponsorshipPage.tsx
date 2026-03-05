import React from "react";

type Sponsorship = {
  id: number;
  sponsorName: string;
  childName: string;
  startDate: string;
  endDate: string;
  status: string;
  notes?: string;
};

const initialData: Sponsorship[] = [
  {
    id: 1,
    sponsorName: "Global Aid Foundation",
    childName: "Amina Khan",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "Active",
    notes: "Covers education",
  },
  {
    id: 2,
    sponsorName: "Hope Trust",
    childName: "Samuel Okoro",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "Inactive",
    notes: "Ended early",
  },
];

const SponsorshipPage: React.FC = () => {
  const [sponsorships, setSponsorships] = React.useState<Sponsorship[]>(initialData);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Sponsorship | null>(null);

  // search/sort/pagination
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortKey, setSortKey] = React.useState<keyof Sponsorship | null>(null);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const [form, setForm] = React.useState({
    sponsorName: "",
    childName: "",
    startDate: "",
    endDate: "",
    status: "Active",
    notes: "",
  });

  function openAdd() {
    setEditing(null);
    setForm({
      sponsorName: "",
      childName: "",
      startDate: "",
      endDate: "",
      status: "Active",
      notes: "",
    });
    setModalOpen(true);
  }

  function openEdit(sponsorship: Sponsorship) {
    setEditing(sponsorship);
    setForm({
      sponsorName: sponsorship.sponsorName,
      childName: sponsorship.childName,
      startDate: sponsorship.startDate,
      endDate: sponsorship.endDate,
      status: sponsorship.status,
      notes: sponsorship.notes || "",
    });
    setModalOpen(true);
  }

  function save() {
    const sponsorName = form.sponsorName.trim();
    const childName = form.childName.trim();
    const startDate = form.startDate;
    const endDate = form.endDate;
    const status = form.status;
    const notes = form.notes;
    if (!sponsorName || !childName || !startDate) return;

    if (editing) {
      setSponsorships((prev) =>
        prev.map((s) =>
          s.id === editing.id
            ? { ...s, sponsorName, childName, startDate, endDate, status, notes }
            : s,
        ),
      );
    } else {
      const nextId = sponsorships.length ? Math.max(...sponsorships.map((s) => s.id)) + 1 : 1;
      setSponsorships((prev) => [
        ...prev,
        {
          id: nextId,
          sponsorName,
          childName,
          startDate,
          endDate,
          status,
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
          Add Sponsorship
        </button>
      </div>

      <div className="w-full">
        <div className="bg-white rounded-lg shadow p-4">
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
                disabled={page * pageSize >= sponsorships.length}
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
                    "sponsorName",
                    "childName",
                    "startDate",
                    "endDate",
                    "status",
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        if (sortKey === key) setSortAsc(!sortAsc);
                        else {
                          setSortKey(key as keyof Sponsorship);
                          setSortAsc(true);
                        }
                      }}
                    >
                      {key === "sponsorName"
                        ? "Sponsor"
                        : key === "childName"
                        ? "Child"
                        : key === "startDate"
                        ? "Start Date"
                        : key === "endDate"
                        ? "End Date"
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
                  let list = sponsorships.filter((s) =>
                    [s.sponsorName, s.childName, s.status]
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
                })().map((s, idx) => (
                  <tr key={s.id} className="border-t">
                    <td className="px-3 py-1">{idx + 1}</td>
                    <td className="px-3 py-1">{s.sponsorName}</td>
                    <td className="px-3 py-1">{s.childName}</td>
                    <td className="px-3 py-1">{s.startDate}</td>
                    <td className="px-3 py-1">{s.endDate}</td>
                    <td className="px-3 py-1">{s.status}</td>
                    <td className="px-3 py-1">{s.notes || "-"}</td>
                    <td className="px-3 py-1">
                      <button
                        onClick={() => openEdit(s)}
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
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-lg shadow p-6 z-10">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Sponsorship" : "Add Sponsorship"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700">Sponsor Name</label>
                <input
                  value={form.sponsorName}
                  onChange={(e) => setForm((s) => ({ ...s, sponsorName: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Child Name</label>
                <input
                  value={form.childName}
                  onChange={(e) => setForm((s) => ({ ...s, childName: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((s) => ({ ...s, startDate: e.target.value }))}
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((s) => ({ ...s, endDate: e.target.value }))}
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
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

export default SponsorshipPage;
