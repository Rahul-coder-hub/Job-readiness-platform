import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Search,
    History as HistoryIcon,
    BookOpen,
    FileCheck,
    Library,
    UserCircle,
    Menu,
    Bell
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
      ${isActive
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}
    `}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-indigo-600">Placement Prep</h2>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <SidebarItem to="/analyze" icon={Search} label="Analyze JD" />
                    <SidebarItem to="/history" icon={HistoryIcon} label="History" />
                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Preparation
                    </div>
                    <SidebarItem to="/practice" icon={BookOpen} label="Practice" />
                    <SidebarItem to="/assessments" icon={FileCheck} label="Assessments" />
                    <SidebarItem to="/resources" icon={Library} label="Resources" />
                    <SidebarItem to="/profile" icon={UserCircle} label="Profile" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserCircle size={24} className="text-gray-400" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold text-gray-900 truncate">Rahul Coder</p>
                            <p className="text-xs text-gray-500 truncate">rahul@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
                    <button className="md:hidden text-gray-600">
                        <Menu size={24} />
                    </button>

                    <div className="flex-1 flex justify-end items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                            <Bell size={20} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                            RC
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
