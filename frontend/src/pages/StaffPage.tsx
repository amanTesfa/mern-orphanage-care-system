import React from "react";
import Card from "../components/Card";

type Staff = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
  status: string;
  notes?: string;
};

const initialData: Staff[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    role: "Caretaker",
    phone: "555-1111",
    email: "john.doe@email.com",
    status: "Active",
    notes: "Night shift",
  },
  {
    id: 2,
    firstName: "Mary",
    lastName: "Smith",
    role: "Nurse",
    phone: "555-2222",
    email: "mary.smith@email.com",
    status: "On Leave",
    notes: "On leave until April",
  },
  {
    id: 3,
    firstName: "Ali",
    lastName: "Khan",
    role: "Cook",
    phone: "555-3333",
    email: "ali.khan@email.com",
    status: "Active",
    notes: "Vegetarian meals",
  },
];

const StaffPage: React.FC = () => {
  const [staff, setStaff] = React.useState<Staff[]>(initialData);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Staff | null>(null);

  // search/sort/pagination
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortKey, setSortKey] = React.useState<keyof Staff | null>(null);
  const [sortAsc, setSortAsc] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
    status: "Active",
  });

  function openAdd() {
    setEditing(null);
    setForm({
      firstName: "",
      lastName: "",
      role: "",
      phone: "",
      email: "",
      status: "Active",
    });
    setModalOpen(true);
  }

  function openEdit(staffMember: Staff) {
    setEditing(staffMember);
    setForm({
      firstName: staffMember.firstName,
      lastName: staffMember.lastName,
      role: staffMember.role,
      phone: staffMember.phone,
      email: staffMember.email,
      status: staffMember.status,
    });
    setModalOpen(true);
  }

  function save() {
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const role = form.role.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const status = form.status;
    if (!firstName || !lastName || !role) return;

    if (editing) {
      setStaff((prev) =>
        prev.map((s) =>
          s.id === editing.id
            ? {
                ...s,
                firstName,
                lastName,
                role,
                phone,
                email,
                status,
              }
            : s,
        ),
      );
    } else {
      const nextId = staff.length ? Math.max(...staff.map((s) => s.id)) + 1 : 1;
      setStaff((prev) => [
        ...prev,
        {
          id: nextId,
          firstName,
          lastName,
          role,
          phone,
          email,
          status,
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
          Add New Staff
        </button>
      </div>

      <div className="w-full">
        <Card title="Staff List">
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
                disabled={page * pageSize >= staff.length}
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
                  <th className="px-3 py-1 ">Sn</th>
                  {[
                    "firstName",
                    "lastName",
                    "role",
                    "phone",
                    "email",
                    "status",
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        if (sortKey === key) setSortAsc(!sortAsc);
                        else {
                          setSortKey(key as keyof Staff);
                          setSortAsc(true);
                        }
                      }}
                    >
                      {key === "firstName"
                        ? "First Name"
                        : key === "lastName"
                        ? "Last Name"
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                      {sortKey === key && (sortAsc ? " ▲" : " ▼")}
                    </th>
                  ))}
                  <th className="px-3 py-1 ">Note</th>
                  <th className="px-3 py-1 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  // filter
                  let list = staff.filter((s) =>
                    [`${s.firstName} ${s.lastName}`, s.role, s.status]
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
                    <td className="px-3 py-1 ">{idx + 1}</td>
                    <td className="px-3 py-1 ">{s.firstName}</td>
                    <td className="px-3 py-1 ">{s.lastName}</td>
                    <td className="px-3 py-1 ">{s.role}</td>
                    <td className="px-3 py-1 ">{s.phone}</td>
                    <td className="px-3 py-1 ">{s.email}</td>
                    <td className="px-3 py-1 ">{s.status}</td>
                    <td className="px-3 py-1 ">{s.notes || "-"}</td>
                    <td className="px-3 py-1 ">
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
              {editing ? "Edit Staff" : "Add New Staff"}
            </h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block  text-gray-700">First Name</label>
                  <input
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, firstName: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block  text-gray-700">Last Name</label>
                  <input
                    value={form.lastName}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, lastName: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block  text-gray-700">Role</label>
                <input
                  value={form.role}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, role: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block  text-gray-700">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, phone: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block  text-gray-700">Email</label>
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, email: e.target.value }))
                    }
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block  text-gray-700">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, status: e.target.value }))
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
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

export default StaffPage;
