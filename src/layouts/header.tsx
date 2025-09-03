import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../stores/useAuthenticationStore';
import { useNotificationStore } from '../stores/useNotificationStore';

interface HeaderProps {
  onMenuToggle?: () => void;
  sidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  sidebarOpen = true,
}) => {
  const { isAuthenticated, signout } = useAuthenticationStore();
  const { unreadCount, markAllAsRead } = useNotificationStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate('/intro');
  };

  return (
    <header className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200/50 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
      <div className="max-w-full mx-auto px-8">
        <div className="flex justify-between items-center h-24">
          {/* 좌측: 메뉴 버튼 + 로고 */}
          <div className="flex items-center space-x-4">
            {/* 사이드바 열기 버튼 (사이드바가 닫혔을 때만 표시) */}
            {!sidebarOpen && onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                title="사이드바 열기"
              >
                <svg
                  className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            )}

            {/* 모바일 메뉴 버튼 (사이드바가 열려있을 때만 표시) */}
            {sidebarOpen && onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="p-3 text-green-700 hover:text-green-800 hover:bg-white/60 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md md:hidden"
              >
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}

            {/* 로고 영역 */}
            <Link
              to="/dashboard"
              className="hidden md:flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">D</span>
              </div>
            </Link>
          </div>

          {/* 우측 버튼 영역 */}
          <div className="flex items-center space-x-4">
            {/* 알림 아이콘 */}
            <button
              className="p-3 bg-white text-green-700 hover:text-green-800 hover:bg-white/60 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md relative group"
              onClick={markAllAsRead}
              title="알림 보기"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.3 21a1.94 1.94 0 003.4 0"
                />
              </svg>
              {/* 알림 표시기 */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </span>
              )}
            </button>

            {/* 사용자 인증 상태에 따른 버튼들 */}
            {isAuthenticated ? (
              <>
                {/* 마이페이지 버튼 */}
                <Link
                  to="/mypage"
                  className="px-6 py-3 text-sm font-medium text-green-700 bg-white/60 border border-green-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                >
                  마이페이지
                </Link>
                {/* 로그아웃 버튼 */}
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 border border-green-600 rounded-xl hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition-all duration-200 shadow-md"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                {/* 회원가입 버튼 */}
                <Link
                  to="/signup"
                  className="px-6 py-3 text-sm font-medium text-green-700 bg-white/60 border border-green-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                >
                  회원가입
                </Link>
                {/* 로그인 버튼 */}
                <Link
                  to="/login"
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 border border-green-600 rounded-xl hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition-all duration-200 shadow-md"
                >
                  로그인
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
