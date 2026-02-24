import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AnalyzeJD from './pages/AnalyzeJD';
import History from './pages/History';
import Results from './pages/Results';

// Placeholder Pages
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
          <Route path="/analyze" element={<AnalyzeJD />} />
          <Route path="/history" element={<History />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results/:id" element={<Results />} />
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
