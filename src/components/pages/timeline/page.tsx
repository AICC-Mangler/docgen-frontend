import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/main.css';
import { useProjectStore } from '../../../stores';

const Documents: React.FC = () => {
  const { projects, isLoading, error, fetchProjectsByMemberId, clearError } =
    useProjectStore();

  const memberId = 1;
  // 컴포넌트 마운트 시 프로젝트 목록 조회
  useEffect(() => {
    const loadProjects = async () => {
      try {
        await fetchProjectsByMemberId(memberId);
      } catch (error) {
        console.error('프로젝트 로딩 실패:', error);
      }
    };

    loadProjects();

    // 컴포넌트 언마운트 시 에러 초기화
    return () => {
      clearError();
    };
  }, [fetchProjectsByMemberId, clearError, memberId]);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-3 text-gray-600">
              프로젝트 목록을 불러오는 중...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-red-200/50 p-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">오류가 발생했습니다</div>
            <div className="text-gray-600 mb-6">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">타임라인</h1>
            <p className="text-gray-600">프로젝트를 선택해 주세요.</p>
          </div>
        </div>

        {/* 프로젝트 선택 */}
        <div className="flex flex-col gap-4 mb-6 text-gray-600">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              등록된 프로젝트가 없습니다.
            </div>
          ) : (
            projects.map((project) => (
              <Link
                key={project.id}
                to={`/timelines/projects/${project.id}`}
                className="flex-1 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer block transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {project.introduction}
                </p>
                <p className="text-xs text-gray-500">
                  {project.project_status == 'COMPLETED'
                    ? '완료'
                    : project.project_status == 'IN_PROGRESS'
                      ? '진행중'
                      : '대기중'}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
