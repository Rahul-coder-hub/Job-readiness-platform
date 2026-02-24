import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';

// Placeholder Pages
const Dashboard = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-32 flex items-center justify-center text-gray-400">
          Metric Card {i}
        </div>
      ))}
    </div>
  </div>
);

const Practice = () => <h1 className="text-3xl font-bold">Practice Problems</h1>;
const Assessments = () => <h1 className="text-3xl font-bold">Mock Assessments</h1>;
const Resources = () => <h1 className="text-3xl font-bold">Preparation Resources</h1>;
const Profile = () => <h1 className="text-3xl font-bold">User Profile</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
