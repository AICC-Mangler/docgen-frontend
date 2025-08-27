import React from 'react';


interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-white border-b border-green-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-14">
           {/* 좌측: 메뉴 버튼 + 로고 */}
           <div className="flex items-center space-x-3">
            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={onMenuToggle}
              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors md:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
           </button>

           {/* 로고 */}
            <h1 className="text-xl font-semibold text-green-700">Docgen</h1>
          </div>

          {/* 우측 버튼 영역 */}
          <div className="flex items-center space-x-3">
            {/* 알림 아이콘 */}
            <button className="p-2 text-green-600 hover:text-green-700 transition-colors relative">
              <svg
                className="h-5 w-5"
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
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>

            {/* 마이페이지 버튼 */}
            <button className="px-4 py-2 text-sm text-green-700 border border-green-300 rounded hover:bg-green-50 transition-colors">
              마이페이지
            </button>

            {/* 로그아웃 버튼 */}
            <button className="px-4 py-2 text-sm text-white bg-green-600 border border-green-600 rounded hover:bg-green-700 transition-colors">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};  
export default Header;
