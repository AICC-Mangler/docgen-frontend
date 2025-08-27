import React from 'react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200/50 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
      <div className="max-w-full mx-auto px-8">
        <div className="flex justify-between items-center h-24">
          {/* 좌측: 메뉴 버튼 + 로고 */}
          <div className="flex items-center space-x-4">
            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={onMenuToggle}
              className="p-3 text-green-700 hover:text-green-800 hover:bg-white/60 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            {/* 로고 영역 */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">D</span>
              </div>
            </div>
          </div>

          {/* 우측 버튼 영역 */}
          <div className="flex items-center space-x-4">
            {/* 알림 아이콘 */}
            <button className="p-3 text-green-700 hover:text-green-800 hover:bg-white/60 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md relative group">
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
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
            </button>

            {/* 마이페이지 버튼 */}
            <button className="px-6 py-3 text-sm font-medium text-green-700 bg-white/60 border border-green-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 backdrop-blur-sm">
              마이페이지
            </button>

            {/* 로그아웃 버튼 */}
            <button className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 border border-green-600 rounded-xl hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition-all duration-200 shadow-md">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};  
export default Header;
