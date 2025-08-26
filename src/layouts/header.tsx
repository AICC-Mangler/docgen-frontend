import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-green-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* 로고 영역 */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-green-700">Docgen</h1>
          </div>

          {/* 우측 버튼 영역 */}
          <div className="flex items-center space-x-3">
            {/* 알림 아이콘 */}
            <button className="p-2 text-green-600 hover:text-green-700 transition-colors">
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
                  d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5V7a10 10 0 1 1 20 0v10z"
                />
              </svg>
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
