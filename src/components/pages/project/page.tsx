import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../common/Modal';
import ProjectCreateModal from './ProjectCreateModal';
import '../../../styles/main.css';

const Project: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const openEditModal = (project: any) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (project: any) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleProjectSubmit = (data: any) => {
    console.log('새 프로젝트 생성:', data);
    // 여기에 API 호출 로직을 추가할 수 있습니다
  };

  const handleProjectEdit = (data: any) => {
    console.log('프로젝트 수정:', data);
    // 여기에 API 호출 로직을 추가할 수 있습니다
  };

  const handleProjectDelete = () => {
    console.log('프로젝트 삭제:', selectedProject);
    // 여기에 API 호출 로직을 추가할 수 있습니다
    setIsDeleteModalOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      id: 1,
      title: 'OO 프로젝트',
      introduction: 'AI를 통한 건축 설계 프로젝트', 
      hashtags: ['건축', '기획'],
      project_status: 'IN_PROGRESS',
      created_date_time: '2025-01-15',
    },
    {
      id: 2,
      title: 'AA 프로젝트',
      introduction: 'AI를 통한 건축 설계 프로젝트', 
      hashtags: ['건축', '기획'],
      project_status: 'PENDING',
      created_date_time: '2024-12-11',
    },
    {
      id: 3,
      title: 'BB 프로젝트',
      introduction: 'AI를 통한 건축 설계 프로젝트', 
      hashtags: ['건축', '기획'],
      project_status: 'COMPLETED',
      created_date_time: '2024-09-13',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 프로젝트 통계 */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              프로젝트 관리
            </h1>
            <p className="text-gray-600">
              보유중인 프로젝트를 관리하세요.
            </p>
          </div>
          <button 
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            새 프로젝트 생성
          </button>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50 hover:bg-gray-100/50 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="block hover:text-green-600 transition-colors duration-200"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                      {project.title}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-2 mb-3">
                    {project.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>진행상태: {project.project_status == 'COMPLETED'
                    ? '완료'
                    : project.project_status == 'IN_PROGRESS'
                      ? '진행중'
                      : '대기중'}</span>
                    <span>작성일: {project.created_date_time}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  {/* 액션 아이콘들 */}
                  <div className="flex-shrink-0 flex flex-col gap-2 ml-4 mt-2">
                    <button
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                      onClick={() => openEditModal(project)}
                      title="수정"
                    >
                      <span className="text-gray-600 text-sm font-bold">✏️</span>
                    </button>
                    <button
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                      onClick={() => openDeleteModal(project)}
                      title="삭제"
                    >
                      <span className="text-gray-600 text-sm">🗑️</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로젝트 생성 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="프로젝트 생성"
        size="lg"
      >
        <ProjectCreateModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleProjectSubmit}
        />
      </Modal>

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

export default Project;
