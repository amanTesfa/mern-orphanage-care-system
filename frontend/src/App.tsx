import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ChildrenPage from "./pages/ChildrenPage";
import StaffPage from "./pages/StaffPage";
import MealPlansPage from "./pages/MealPlansPage";
import AdoptionsPage from "./pages/AdoptionsPage";
import VisitorsPage from "./pages/VisitorsPage";
import InventoryPage from "./pages/InventoryPage";
import AttendancePage from "./pages/AttendancePage";
import SponsorPage from "./pages/SponsorPage";
import ReportPage from "./pages/ExpensePage";
import SponsorshipPage from "./pages/SponsorshipPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/children" />} />
          <Route path="children" element={<ChildrenPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="meal-plans" element={<MealPlansPage />} />
          <Route path="adoptions" element={<AdoptionsPage />} />
          <Route path="visitors" element={<VisitorsPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="sponsors" element={<SponsorPage />} />
          <Route path="expenses" element={<ReportPage />} />
          <Route path="sponsorships" element={<SponsorshipPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
