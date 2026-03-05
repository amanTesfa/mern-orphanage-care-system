import React from "react";
import Card from "../components/Card";

type Adoption = {
  id: number;
  childName: string;
  adopterName: string;
  adoptionDate: string; // ISO
  status: string;
  notes?: string;
};

const initialData: Adoption[] = [
  {
    id: 1,
    childName: "Amina Khan",
    adopterName: "Fatima & Omar Khan",
    adoptionDate: "2024-08-15",
    status: "Completed",
    notes: "Smooth process",
  },
  {
    id: 2,
    childName: "Samuel Okoro",
    adopterName: "Grace & Paul Okoro",
    adoptionDate: "2025-01-10",
    status: "Pending",
    notes: "Awaiting documents",
  },
];

const AdoptionsPage: React.FC = () => {
  const [adoptions, setAdoptions] = React.useState<Adoption[]>(initialData);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Adoption | null>(null);

  // search/sort/pagination
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortKey, setSortKey] = React.useState<keyof Adoption | null>(null);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const [form, setForm] = React.useState({
    childName: "",
    adopterName: "",
    adoptionDate: "",
    status: "Pending",
    notes: "",
  });

  function openAdd() {
    setEditing(null);
    setForm({
      childName: "",
      adopterName: "",
      adoptionDate: "",
      status: "Pending",
      notes: "",
    });
    setModalOpen(true);
  }

  function openEdit(adoption: Adoption) {
    setEditing(adoption);
    setForm({
      childName: adoption.childName,
      adopterName: adoption.adopterName,
      adoptionDate: adoption.adoptionDate,
      status: adoption.status,
      notes: adoption.notes || "",
    });
    setModalOpen(true);
  }

  function save() {
    const childName = form.childName.trim();
    const adopterName = form.adopterName.trim();
    const adoptionDate = form.adoptionDate;
    const status = form.status;
    const notes = form.notes;
    if (!childName || !adopterName || !adoptionDate) return;

    if (editing) {
      setAdoptions((prev) =>
        prev.map((a) =>
          a.id === editing.id
            ? { ...a, childName, adopterName, adoptionDate, status, notes }
            : a,
        ),
      );
    } else {
      const nextId = adoptions.length ? Math.max(...adoptions.map((a) => a.id)) + 1 : 1;
      setAdoptions((prev) => [
        ...prev,
        {
          id: nextId,
          childName,
          adopterName,
          adoptionDate,
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
          Add New Adoption
        </button>
      </div>

      <div className="w-full">
        <Card title="Adoption Records">
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
                disabled={page * pageSize >= adoptions.length}
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
                    "childName",
                    "adopterName",
                    "adoptionDate",
                    "status",
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        if (sortKey === key) setSortAsc(!sortAsc);
                        else {
                          setSortKey(key as keyof Adoption);
                          setSortAsc(true);
                        }
                      }}
                    >
                      {key === "childName"
                        ? "Child"
                        : key === "adopterName"
                        ? "Adopter"
                        : key === "adoptionDate"
                        ? "Date"
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
                  let list = adoptions.filter((a) =>
                    [a.childName, a.adopterName, a.status]
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
                })().map((a, idx) => (
                  <tr key={a.id} className="border-t">
                    <td className="px-3 py-1">{idx + 1}</td>
                    <td className="px-3 py-1">{a.childName}</td>
                    <td className="px-3 py-1">{a.adopterName}</td>
                    <td className="px-3 py-1">{a.adoptionDate}</td>
                    <td className="px-3 py-1">{a.status}</td>
                    <td className="px-3 py-1">{a.notes || "-"}</td>
                    <td className="px-3 py-1">
                      <button
                        onClick={() => openEdit(a)}
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
              {editing ? "Edit Adoption" : "Add New Adoption"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700">Child Name</label>
                <input
                  value={form.childName}
                  onChange={(e) => setForm((s) => ({ ...s, childName: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Adopter Name</label>
                <input
                  value={form.adopterName}
                  onChange={(e) => setForm((s) => ({ ...s, adopterName: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Adoption Date</label>
                <input
                  type="date"
                  value={form.adoptionDate}
                  onChange={(e) => setForm((s) => ({ ...s, adoptionDate: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
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

export default AdoptionsPage;
