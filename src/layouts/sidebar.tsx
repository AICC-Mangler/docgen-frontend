import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'intro',
      label: 'Home',
      path: '/intro',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: 'dashboard',
      label: '대시보드',
      path: '/dashboard',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
    },
    {
      id: 'notices',
      label: '공지사항',
      path: '/notices',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 'documents',
      label: '문서 목록',
      path: '/documents',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },

    {
      id: 'project',
      label: '프로젝트',
      path: '/projects',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: 'timeline',
      label: '타임라인',
      path: '/timelines',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  // 현재 활성 메뉴 확인
  const getActiveMenu = () => {
    const currentPath = location.pathname;
    if (currentPath === '/' || currentPath === '/intro') return 'intro';

    // 타임라인 관련 경로 처리
    if (currentPath.startsWith('/timelines/')) return 'timeline';
    // 프로젝트 관련 경로 처리
    if (currentPath.startsWith('/projects/')) return 'project';

    return menuItems.find((item) => item.path === currentPath)?.id || 'intro';
  };

  const activeMenu = getActiveMenu();

  return (
    <aside
      className={`bg-white border-r border-green-200/50 w-80 h-full z-40 backdrop-blur-sm shadow-xl flex flex-col ${
        isOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      {/* 사이드바 헤더 */}
      <div className="p-6 border-b border-green-200/50 bg-gradient-to-r from-green-600 to-emerald-600 flex-shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">DocGen</h2>
            </div>
          </div>
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-2.5 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeMenu === item.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white/60 hover:text-green-700 hover:shadow-md hover:transform hover:scale-105'
                }`}
              >
                <span
                  className={`flex-shrink-0 transition-all duration-200 ${
                    activeMenu === item.id
                      ? 'text-white'
                      : 'text-green-600 group-hover:text-green-700'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-semibold text-base">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
