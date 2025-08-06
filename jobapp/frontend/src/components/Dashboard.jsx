import React, { useState, useRef, useEffect } from 'react';
// Tailwind CSS is assumed to be included globally in your React app

const Dashboard = () => {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  // View state
  const [view, setView] = useState('kanban');
  // Profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Sidebar state (for mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Kanban drag and drop logic (basic, for demo only)
  useEffect(() => {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-column-content');
    cards.forEach(card => {
      card.addEventListener('dragstart', () => card.classList.add('dragging'));
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });
    columns.forEach(column => {
      column.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(column, e.clientY);
        const dragging = document.querySelector('.dragging');
        if (dragging) {
          if (afterElement == null) {
            column.appendChild(dragging);
          } else {
            column.insertBefore(dragging, afterElement);
          }
        }
      });
    });
    function getDragAfterElement(column, y) {
      const draggableElements = [...column.querySelectorAll('.kanban-card:not(.dragging)')];
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  }, []);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside id="sidebar" className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 text-indigo-600">💼</span>
            <span className="text-xl font-semibold text-slate-800">JobTrack</span>
          </div>
        </div>
        {/* Navigation */}
        <nav className="py-6 px-4">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                <span className="w-5 h-5 mr-3">📊</span>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                <span className="w-5 h-5 mr-3">📦</span>
                Your Collection
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                <span className="w-5 h-5 mr-3">📄</span>
                CV Builder
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                <span className="w-5 h-5 mr-3">💡</span>
                Interview Prep
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                <span className="w-5 h-5 mr-3">⚙️</span>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button id="sidebar-toggle" className="lg:hidden text-slate-500 hover:text-slate-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span className="sr-only">Open sidebar</span>
              <span className="w-6 h-6">☰</span>
            </button>
            {/* Search bar */}
            <div className="flex-1 flex justify-center px-4 lg:px-0">
              <div className="w-full max-w-xs lg:max-w-md">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="w-5 h-5 text-slate-400">🔍</span>
                  </div>
                  <input id="search" name="search" className="block w-full bg-slate-100 border border-transparent rounded-lg py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Search applications, companies..." type="search" />
                </div>
              </div>
            </div>
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button id="profile-button" className="flex items-center space-x-2" onClick={e => { e.stopPropagation(); setProfileOpen(!profileOpen); }}>
                <img className="h-8 w-8 rounded-full" src="https://placehold.co/32x32/E0E7FF/4F46E5?text=A" alt="User avatar" />
              </button>
              {profileOpen && (
                <div id="profile-dropdown" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Sign out</a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Applications</h1>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              {/* View Toggle */}
              <div className="flex items-center p-1 bg-slate-200 rounded-lg">
                <button id="kanban-view-btn" className={`px-3 py-1 text-sm font-medium rounded-md shadow ${view === 'kanban' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`} onClick={() => setView('kanban')}>Kanban</button>
                <button id="table-view-btn" className={`px-3 py-1 text-sm font-medium rounded-md ${view === 'table' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600'}`} onClick={() => setView('table')}>Table</button>
              </div>
              <button id="add-new-btn" className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setModalOpen(true)}>
                <span className="w-5 h-5 mr-2 -ml-1">＋</span>
                Add New Application
              </button>
            </div>
          </div>

          {/* Kanban Board View */}
          {view === 'kanban' && (
            <div id="kanban-view">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {/* Kanban Columns */}
                {/* ... Kanban columns and cards go here (static for now, see HTML) ... */}
                {/* You can map over data here for dynamic content */}
                <div className="kanban-column bg-white rounded-xl shadow-sm" data-column-id="interested">
                  <h2 className="text-lg font-semibold text-slate-800 p-4 border-b border-slate-200">Interested (2)</h2>
                  <div className="kanban-column-content p-4 space-y-4 h-[calc(100vh-250px)] overflow-y-auto">
                    {/* Kanban Cards */}
                    <div className="kanban-card bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm cursor-grab" draggable="true" data-card-id="1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <img src="https://placehold.co/40x40/c7d2fe/3730a3?text=G" className="w-10 h-10 rounded-md" alt="Google Logo" />
                          <div>
                            <p className="font-semibold text-slate-900">Google</p>
                            <p className="text-sm text-slate-600">Software Engineer Intern</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="px-2 py-1 text-xs font-medium text-slate-700 bg-slate-200 rounded-full">To Apply</span>
                        <span className="text-slate-500">Deadline: Aug 30</span>
                      </div>
                    </div>
                    <div className="kanban-card bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm cursor-grab" draggable="true" data-card-id="2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <img src="https://placehold.co/40x40/a5f3fc/0e7490?text=V" className="w-10 h-10 rounded-md" alt="Vercel Logo" />
                          <div>
                            <p className="font-semibold text-slate-900">Vercel</p>
                            <p className="text-sm text-slate-600">Frontend Developer</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="px-2 py-1 text-xs font-medium text-slate-700 bg-slate-200 rounded-full">Researching</span>
                        <span className="text-slate-500">Saved: Aug 01</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ...other columns (applied, interview, offer, rejected) ... */}
              </div>
            </div>
          )}

          {/* Table View */}
          {view === 'table' && (
            <div id="table-view">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date Applied</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {/* Table Rows (static for now) */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md" src="https://placehold.co/40x40/c7d2fe/3730a3?text=G" alt="Google Logo" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">Google</div>
                            <div className="text-sm text-slate-500">Mountain View, CA</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">Software Engineer Intern</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">-</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">Interested</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                      </td>
                    </tr>
                    {/* ...other rows... */}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add New Application Modal */}
          {modalOpen && (
            <div id="add-new-modal" className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="modal-enter bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Add New Application</h2>
                  <button id="close-modal-btn" className="text-slate-400 hover:text-slate-600" onClick={() => setModalOpen(false)}>
                    <span className="w-6 h-6">✕</span>
                  </button>
                </div>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="company-name" className="block text-sm font-medium text-slate-700">Company Name</label>
                      <input type="text" id="company-name" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Google" />
                    </div>
                    <div>
                      <label htmlFor="job-title" className="block text-sm font-medium text-slate-700">Job Title</label>
                      <input type="text" id="job-title" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Software Engineer" />
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                      <select id="status" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Interested</option>
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="date-applied" className="block text-sm font-medium text-slate-700">Date</label>
                      <input type="date" id="date-applied" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" id="cancel-modal-btn" className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none" onClick={() => setModalOpen(false)}>Cancel</button>
                    <button type="submit" className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none">Save Application</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
