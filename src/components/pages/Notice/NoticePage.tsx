import React, { useState, useEffect } from 'react';
import NoticeCreateModal from './NoticeCreateModal';
import NoticeEditModal from './NoticeEditModal';
import NoticeDeleteModal from './NoticeDeleteModal';
import NoticeViewModal from './NoticeViewModal';

interface Notice {
  id: number;
  title: string;
  content: string;
  created_date_time: string;
}

const NoticePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: '시스템 점검 안내',
      content:
        '2025년 1월 20일 새벽 2시부터 4시까지 시스템 점검이 예정되어 있습니다.',
      created_date_time: '2025-01-15',
    },
    {
      id: 2,
      title: '새로운 기능 업데이트',
      content:
        '문서 관리 시스템에 새로운 검색 기능과 태그 시스템이 추가되었습니다.',
      created_date_time: '2025-01-14',
    },
    {
      id: 3,
      title: '보안 정책 변경',
      content:
        '보안 강화를 위해 비밀번호 정책이 변경되었습니다. 8자 이상, 특수문자 포함이 필수입니다.',
      created_date_time: '2025-01-13',
    },
    {
      id: 4,
      title: '연말 휴무 안내',
      content: '2024년 12월 31일부터 2025년 1월 2일까지 연말 휴무입니다.',
      created_date_time: '2025-01-12',
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [deleteNoticeTitle, setDeleteNoticeTitle] = useState('');

  const handleCreateNotice = (newNotice: {
    title: string;
    content: string;
  }) => {
    const notice: Notice = {
      id: Math.max(...notices.map((n) => n.id)) + 1,
      title: newNotice.title,
      content: newNotice.content,
      created_date_time: new Date().toISOString().split('T')[0],
    };
    setNotices([notice, ...notices]);
  };

  const handleEditNotice = (
    id: number,
    updatedNotice: { title: string; content: string },
  ) => {
    setNotices(
      notices.map((notice) =>
        notice.id === id
          ? {
              ...notice,
              title: updatedNotice.title,
              content: updatedNotice.content,
            }
          : notice,
      ),
    );
  };

  const handleDeleteNotice = () => {
    if (selectedNotice) {
      setNotices(notices.filter((notice) => notice.id !== selectedNotice.id));
      setSelectedNotice(null);
    }
  };

  const openEditModal = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (notice: Notice) => {
    setSelectedNotice(notice);
    setDeleteNoticeTitle(notice.title);
    setIsDeleteModalOpen(true);
  };

  const openViewModal = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedNotice(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">공지사항</h1>
            <p className="text-gray-600">
              중요한 소식과 업데이트를 확인하세요.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            새 공지 작성
          </button>
        </div>

        {/* 공지사항 목록 */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-md bg-gray-50/50 border-gray-200/50`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3
                      className={`text-lg font-semibold text-gray-600 cursor-pointer hover:text-green-600 transition-colors duration-200`}
                      onClick={() => openViewModal(notice)}
                    >
                      {notice.title}
                    </h3>
                  </div>
                  <p
                    className="text-gray-600 mb-4 leading-relaxed overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {notice.content}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>작성일: {notice.created_date_time}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => openViewModal(notice)}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                    title="보기"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => openEditModal(notice)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="수정"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => openDeleteModal(notice)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    title="삭제"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-8">
          <nav className="flex space-x-2">
            <button className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              이전
            </button>
            <button className="px-3 py-2 text-white bg-green-600 border border-green-600 rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              2
            </button>
            <button className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              3
            </button>
            <button className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              다음
            </button>
          </nav>
        </div>
      </div>

      {/* 모달들 */}
      <NoticeCreateModal
        isOpen={isCreateModalOpen}
        onClose={closeModals}
        onSubmit={handleCreateNotice}
      />

      <NoticeEditModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        onUpdate={handleEditNotice}
        notice={selectedNotice}
      />

      <NoticeDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={handleDeleteNotice}
        noticeTitle={deleteNoticeTitle}
      />

      <NoticeViewModal
        isOpen={isViewModalOpen}
        onClose={closeModals}
        notice={selectedNotice}
      />
    </div>
  );
};

export default NoticePage;
