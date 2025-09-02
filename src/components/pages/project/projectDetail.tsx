import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Modal from '../../common/Modal';
import ProjectCreateModal from './ProjectCreateModal';
import '../../../styles/main.css';
import { useProjectStore } from '../../../stores/useProjectStore';

const ProjectDetail: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    currentProject,
    isLoading,
    error,
    fetchProjectById,
    updateProject,
    deleteProject,
    clearError,
  } = useProjectStore();

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      try {
        await fetchProjectById(parseInt(id, 10));
      } catch (error) {
        console.error('프로젝트 로딩 실패:', error);
      }
    };

    loadProject();

    // 컴포넌트 언마운트 시 에러 초기화
    return () => {
      clearError();
    };
  }, [fetchProjectById, clearError, id]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-3 text-gray-600">
              프로젝트 정보를 불러오는 중...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-red-200/50 p-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">오류가 발생했습니다</div>
            <div className="text-gray-600 mb-6">{error}</div>
            <Link
              to="/projects"
              className="text-green-600 hover:text-green-700 underline"
            >
              프로젝트 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-red-200/50 p-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">
              프로젝트를 찾을 수 없습니다
            </div>
            <Link
              to="/projects"
              className="text-green-600 hover:text-green-700 underline"
            >
              프로젝트 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return '완료';
      case 'IN_PROGRESS':
        return '진행중';
      case 'PENDING':
        return '대기중';
      default:
        return '알 수 없음';
    }
  };

  const openEditModal = (project: any) => {
    setIsEditModalOpen(true);
    setSelectedProject(project);
  };

  const openDeleteModal = (project: any) => {
    setIsDeleteModalOpen(true);
    setSelectedProject(project);
  };

  const handleProjectEdit = async (data: any) => {
    console.log('handleProjectEdit', data);
    try {
      await updateProject(selectedProject.id, {
        title: data.title,
        introduction: data.introduction,
        project_status: data.project_status,
        hashtags: data.hashtags,
      });
      // 프로젝트 수정 성공 후 모달 닫기
      setIsEditModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error('프로젝트 수정 실패:', error);
    }
  };

  const handleProjectDelete = async () => {
    if (!selectedProject) return;

    console.log('프로젝트 삭제:', selectedProject);

    try {
      await deleteProject(selectedProject.id);
      setIsDeleteModalOpen(false);
      setSelectedProject(null);
      navigate('/projects');
    } catch (error) {
      console.error('프로젝트 삭제 실패:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link
          to="/projects"
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          프로젝트 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {currentProject.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {currentProject.introduction}
            </p>
            <div className="flex items-center space-x-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentProject.project_status)}`}
              >
                {getStatusText(currentProject.project_status)}
              </span>
            </div>
            {currentProject.hashtags && currentProject.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {currentProject.hashtags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">생성일</div>
            <div className="text-lg font-medium text-gray-800">
              {new Date(currentProject.created_date_time).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              프로젝트 설명
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentProject.introduction}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              프로젝트 관리
            </h3>
            <div className="space-y-3">
              <Link
                to={`/timelines/projects/${currentProject.id}`}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-center block"
              >
                타임라인 보기
              </Link>
              <button
                className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                onClick={() => openEditModal(currentProject)}
                title="수정"
              >
                프로젝트 수정
              </button>

              <button
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                onClick={() => openDeleteModal(currentProject)}
                title="삭제"
              >
                프로젝트 삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 프로젝트 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProject(null);
        }}
        title="프로젝트 수정"
        size="lg"
      >
        <ProjectCreateModal
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProject(null);
          }}
          onSubmit={handleProjectEdit}
          isEditMode={true}
          initialData={selectedProject}
        />
      </Modal>

      {/* 프로젝트 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProject(null);
        }}
        title="프로젝트 삭제"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              <strong>"{selectedProject?.title}"</strong> 프로젝트를
              삭제하시겠습니까?
            </p>
            <p className="text-sm text-gray-500">
              이 작업은 되돌릴 수 없습니다.
            </p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedProject(null);
              }}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleProjectDelete}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetail;
