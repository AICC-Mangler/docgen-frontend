import React from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { useNotificationStore } from '../../stores/useNotificationStore';

const Dashboard: React.FC = () => {
  const { user, login, logout } = useUserStore();
  const { addNotification } = useNotificationStore();

  const handleTestLogin = () => {
    login({
      id: '1',
      name: '김철수',
      email: 'kim@example.com',
      role: 'ADMIN',
    });

    addNotification({
      title: '로그인 성공',
      message: '김철수님, 환영합니다!',
      type: 'success',
      isRead: false,
    });
  };

  const handleTestLogout = () => {
    logout();
    addNotification({
      title: '로그아웃',
      message: '안전하게 로그아웃되었습니다.',
      type: 'info',
      isRead: false,
    });
  };

  const handleAddTestNotification = () => {
    addNotification({
      title: '테스트 알림',
      message: '이것은 테스트 알림입니다.',
      type: 'info',
      isRead: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">대시보드</h1>
            <p className="text-gray-600 mb-6">
              문서 관리 시스템의 현황을 한눈에 확인하세요.
            </p>
          </div>

          {/* 테스트 버튼들 */}
          <div className="flex space-x-3">
            {!user ? (
              <button
                onClick={handleTestLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                테스트 로그인
              </button>
            ) : (
              <button
                onClick={handleTestLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                테스트 로그아웃
              </button>
            )}
            <button
              onClick={handleAddTestNotification}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              알림 추가
            </button>
          </div>
        </div>

        {/* 사용자 정보 표시 */}
        {user && (
          <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              현재 로그인된 사용자
            </h3>
            <p className="text-green-700">이름: {user.name}</p>
            <p className="text-green-700">이메일: {user.email}</p>
            <p className="text-green-700">권한: {user.role}</p>
          </div>
        )}

        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">총 문서 수</p>
                <p className="text-2xl font-bold text-green-800">1,234</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
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
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  활성 프로젝트
                </p>
                <p className="text-2xl font-bold text-blue-800">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
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
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  총 멤버 수
                </p>
                <p className="text-2xl font-bold text-purple-800">89</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="bg-gray-50/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            최근 활동
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                새 문서가 생성되었습니다: "프로젝트 계획서"
              </span>
              <span className="text-xs text-gray-400 ml-auto">2시간 전</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                문서가 업데이트되었습니다: "회의록"
              </span>
              <span className="text-xs text-gray-400 ml-auto">5시간 전</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                새 멤버가 추가되었습니다: "김철수"
              </span>
              <span className="text-xs text-gray-400 ml-auto">1일 전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
