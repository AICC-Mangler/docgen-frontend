import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';
import Modal from '../../common/Modal';
import TimelineCreateModal from './TimelineCreateModal';
import '../../../styles/main.css';

const TimelineDetail: React.FC = () => {
  // const { projectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTimelineSubmit = (data: any) => {
    console.log('새 타임라인 생성:', data);
    // 여기에 API 호출 로직을 추가할 수 있습니다
  };

  const handleTimelineEdit = (data: any) => {
    console.log('타임라인 수정:', data);
    // 여기에 API 호출 로직을 추가할 수 있습니다
  };

  const handleTimelineDelete = () => {
    console.log('타임라인 삭제:', selectedTimeline);
    // 여기에 API 호출 로직을 추가할 수 있습니다
    setIsDeleteModalOpen(false);
    setSelectedTimeline(null);
  };

  const openEditModal = (timeline: any) => {
    setSelectedTimeline(timeline);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (timeline: any) => {
    setSelectedTimeline(timeline);
    setIsDeleteModalOpen(true);
  };

  const timeline = [
    {
      id: 1,
      title: '프로젝트 계획서',
      description: '기획',
      event_date: '2025-01-15',
    },
    {
      id: 2,
      title: '회의록 - 1월 정기회의',
      description: '회의',
      event_date: '2025-01-14',
    },
    {
      id: 3,
      title: '인터뷰 내용 정리',
      description:
        '10명의 잠재 고객과 인터뷰를 진행했습니다. 기존 검색 기능에 대한 불만족도가 높고, AI 추천 기능에 대한 기대도가 높습니다. 판매자 인증 시스템의 중요성도 확인되었으며, 이 피드백을 바탕으로 기능 우선순위를 재조정해야 합니다.',
      event_date: '2025.08.07',
    },
    {
      id: 4,
      title: '프로젝트 미팅 완료',
      description:
        'AI 마켓플레이스 프로젝트 킥오프 미팅을 오늘 진행했습니다. 프로젝트 목표와 일정을 팀원들과 공유하고 각자의 역할을 명확히 했습니다.',
      event_date: '2025.08.05',
    },
  ];

  const filteredTimeline = timeline.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">타임라인</h1>
          </div>
          <button
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            타임라인 생성
          </button>
        </div>

        {/* 검색바 */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="제목이나 내용으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 세로 타임라인 */}
        <div className="relative">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="flex items-start mb-8 last:mb-0">
              {/* 선택 아이콘 */}
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-2">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* 날짜 */}
              <div className="flex-shrink-0 w-24 text-sm font-medium text-gray-600 mr-4 mt-2">
                {item.event_date}
              </div>

              {/* 콘텐츠 영역 */}
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[80px]">
                {item.title ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      내용을 입력하세요
                    </span>
                  </div>
                )}
              </div>

              {/* 액션 아이콘들 */}
              <div className="flex-shrink-0 flex flex-col gap-2 ml-4 mt-2">
                <button
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                  onClick={() => openEditModal(item)}
                  title="수정"
                >
                  <span className="text-gray-600 text-sm font-bold">✏️</span>
                </button>
                <button
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                  onClick={() => openDeleteModal(item)}
                  title="삭제"
                >
                  <span className="text-gray-600 text-sm">🗑️</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 타임라인 생성 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="타임라인 생성"
        size="lg"
      >
        <TimelineCreateModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleTimelineSubmit}
        />
      </Modal>

      {/* 타임라인 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTimeline(null);
        }}
        title="타임라인 수정"
        size="lg"
      >
        <TimelineCreateModal
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTimeline(null);
          }}
          onSubmit={handleTimelineEdit}
          isEditMode={true}
          initialData={selectedTimeline}
        />
      </Modal>

      {/* 타임라인 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTimeline(null);
        }}
        title="타임라인 삭제"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              <strong>"{selectedTimeline?.title}"</strong> 타임라인을
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
                setSelectedTimeline(null);
              }}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleTimelineDelete}
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

export default TimelineDetail;
