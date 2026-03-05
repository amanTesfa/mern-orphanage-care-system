import React from "react";

type Sponsor = {
  id: number;
  name: string;
  contact: string;
  email: string;
  status: string;
  notes?: string;
};

const initialData: Sponsor[] = [
  {
    id: 1,
    name: "Global Aid Foundation",
    contact: "Mr. Lee, 555-8888",
    email: "lee@globalaid.org",
    status: "Active",
    notes: "Monthly donor",
  },
  {
    id: 2,
    name: "Hope Trust",
    contact: "Ms. Patel, 555-7777",
    email: "patel@hopetrust.com",
    status: "Inactive",
    notes: "Paused sponsorship",
  },
];

const SponsorPage: React.FC = () => {
  const [sponsors, setSponsors] = React.useState<Sponsor[]>(initialData);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Sponsor | null>(null);

  // search/sort/pagination
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortKey, setSortKey] = React.useState<keyof Sponsor | null>(null);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const [form, setForm] = React.useState({
    name: "",
    contact: "",
    email: "",
    status: "Active",
    notes: "",
  });

  function openAdd() {
    setEditing(null);
    setForm({
      name: "",
      contact: "",
      email: "",
      status: "Active",
      notes: "",
    });
    setModalOpen(true);
  }

  function openEdit(sponsor: Sponsor) {
    setEditing(sponsor);
    setForm({
      name: sponsor.name,
      contact: sponsor.contact,
      email: sponsor.email,
      status: sponsor.status,
      notes: sponsor.notes || "",
    });
    setModalOpen(true);
  }

  function save() {
    const name = form.name.trim();
    const contact = form.contact.trim();
    const email = form.email.trim();
    const status = form.status;
    const notes = form.notes;
    if (!name || !contact || !email) return;

    if (editing) {
      setSponsors((prev) =>
        prev.map((s) =>
          s.id === editing.id
            ? { ...s, name, contact, email, status, notes }
            : s,
        ),
      );
    } else {
      const nextId = sponsors.length ? Math.max(...sponsors.map((s) => s.id)) + 1 : 1;
      setSponsors((prev) => [
        ...prev,
        {
          id: nextId,
          name,
          contact,
          email,
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
          Add Sponsor
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
                disabled={page * pageSize >= sponsors.length}
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
                    "contact",
                    "email",
                    "status",
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        if (sortKey === key) setSortAsc(!sortAsc);
                        else {
                          setSortKey(key as keyof Sponsor);
                          setSortAsc(true);
                        }
                      }}
                    >
                      {key === "name"
                        ? "Name"
                        : key === "contact"
                        ? "Contact"
                        : key === "email"
                        ? "Email"
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
                  let list = sponsors.filter((s) =>
                    [s.name, s.contact, s.email, s.status]
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
                    <td className="px-3 py-1">{s.name}</td>
                    <td className="px-3 py-1">{s.contact}</td>
                    <td className="px-3 py-1">{s.email}</td>
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
              {editing ? "Edit Sponsor" : "Add Sponsor"}
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
                <label className="block text-gray-700">Contact</label>
                <input
                  value={form.contact}
                  onChange={(e) => setForm((s) => ({ ...s, contact: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
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

export default SponsorPage;
