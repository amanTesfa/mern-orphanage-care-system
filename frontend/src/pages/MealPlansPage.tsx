import React from "react";
import Card from "../components/Card";

type MealPlan = {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const initialPlans: MealPlan[] = daysOfWeek.map((day) => ({
  day,
  breakfast: "",
  lunch: "",
  dinner: "",
}));

const MealPlansPage: React.FC = () => {
  const [plans, setPlans] = React.useState<MealPlan[]>(initialPlans);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingDay, setEditingDay] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  function openEdit(day: string) {
    const plan = plans.find((p) => p.day === day);
    setEditingDay(day);
    setForm({
      breakfast: plan?.breakfast || "",
      lunch: plan?.lunch || "",
      dinner: plan?.dinner || "",
    });
    setModalOpen(true);
  }

  function save() {
    if (!editingDay) return;
    setPlans((prev) =>
      prev.map((p) =>
        p.day === editingDay
          ? { ...p, ...form }
          : p
      )
    );
    setModalOpen(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Weekly Meal Plan</h1>
      <div className="w-full">
        <Card title="Weekly Meal Schedule">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left px-3 py-2 text-gray-600">
              <thead>
                <tr className="border-t bg-taupe-200">
                  <th className="px-3 py-1">Day</th>
                  <th className="px-3 py-1">Breakfast</th>
                  <th className="px-3 py-1">Lunch</th>
                  <th className="px-3 py-1">Dinner</th>
                  <th className="px-3 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.day} className="border-t">
                    <td className="px-3 py-1 font-semibold">{plan.day}</td>
                    <td className="px-3 py-1">{plan.breakfast || <span className="text-gray-400">-</span>}</td>
                    <td className="px-3 py-1">{plan.lunch || <span className="text-gray-400">-</span>}</td>
                    <td className="px-3 py-1">{plan.dinner || <span className="text-gray-400">-</span>}</td>
                    <td className="px-3 py-1">
                      <button
                        onClick={() => openEdit(plan.day)}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 cursor-pointer"
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
              Edit Meal Plan for {editingDay}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700">Breakfast</label>
                <input
                  value={form.breakfast}
                  onChange={(e) => setForm((s) => ({ ...s, breakfast: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Lunch</label>
                <input
                  value={form.lunch}
                  onChange={(e) => setForm((s) => ({ ...s, lunch: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Dinner</label>
                <input
                  value={form.dinner}
                  onChange={(e) => setForm((s) => ({ ...s, dinner: e.target.value }))}
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

export default MealPlansPage;
