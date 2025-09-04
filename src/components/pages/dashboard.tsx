import React, { useState, useEffect } from 'react';
import { useAuthenticationStore } from '../../stores/useAuthenticationStore';
import ProtectedRoute from '../common/ProtectedRoute';

// API 기본 URL 설정
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_DEV_URL ||
  import.meta.env.VITE_BACKEND_LOCAL_URL ||
  'http://localhost:3100';

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  total?: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuthenticationStore();
  const [documentCount, setDocumentCount] = useState<number>(0);
  const [projectCount, setProjectCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentNotice, setRecentNotice] = useState<any[]>([]);

  // 사용자 문서 개수 조회
  useEffect(() => {
    const fetchDocumentCount = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/document/users/${user.id}`,
          {
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<any[]> = await response.json();
        if (result.success) {
          setDocumentCount(result.data.length);
        } else {
          console.error('문서 개수 조회 실패:', result.message);
        }
      } catch (error) {
        console.error('문서 개수 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocumentCount();
  }, [user?.id]);

  // 사용자 프로젝트 개수 조회
  useEffect(() => {
    const fetchProjectCount = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/projects/count/${user.id}`,
          {
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: any = await response.json();
        if (result.success) {
          // result.id가 문자열로 반환되므로 숫자로 변환
          setProjectCount(parseInt(result.data.id, 10) || 0);
        } else {
          console.error('프로젝트 개수 조회 실패:', result.message);
        }
      } catch (error) {
        console.error('프로젝트 개수 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectCount();
  }, [user?.id]);

  // 공지사항 최근 목록 3개 조회
  useEffect(() => {
    const fetchRecentNotice = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/notices?page=1&limit=3`, {
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: any = await response.json();
        if (result.success) {
          setRecentNotice(result.data || []);
        } else {
          console.error('공지사항 조회 실패:', result.message);
        }
      } catch (error) {
        console.error('공지사항 조회 실패:', error);
      }
    };
    fetchRecentNotice();
  }, []);

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
        </div>

        {/* 사용자 정보 표시 */}
        {user && (
          <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              사용자 정보 표시
            </h3>
            <p className="text-green-700">이름: {user.name}</p>
            <p className="text-green-700">이메일: {user.email}</p>
            {/* <p className="text-green-700">권한: {user.role}</p> */}
          </div>
        )}

        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  총 프로젝트 수
                </p>
                {isLoading ? (
                  <div className="animate-pulse bg-green-200 h-8 w-12 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-green-800">
                    {projectCount}
                  </p>
                )}
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">총 문서 수</p>
                {isLoading ? (
                  <div className="animate-pulse bg-blue-200 h-8 w-12 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-blue-800">
                    {documentCount}
                  </p>
                )}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 공지사항 */}
        <div className="bg-gray-50/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            최근 공지사항
          </h3>
          <div className="space-y-3">
            {recentNotice.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                등록된 공지사항이 없습니다.
              </div>
            ) : (
              recentNotice.map((notice: any) => (
                <div
                  key={notice.id}
                  className="flex items-center space-x-3 p-3 bg-white rounded-xl"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      notice.noticetype === 'EVENT'
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                  ></div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-600 font-medium">
                      {notice.title}
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notice.noticetype === 'EVENT'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {notice.noticetype === 'EVENT' ? '중요' : '일반'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(notice.post_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
);

export default DashboardPage;
