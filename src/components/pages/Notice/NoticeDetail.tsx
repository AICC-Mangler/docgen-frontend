import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Modal from '../../common/Modal';
import NoticeCreateModal from './NoticeCreateModal';
import '../../../styles/main.css';
import { useNoticeStore } from '../../../stores/useNoticeStore';
import { useAuthenticationStore } from '../../../stores/useAuthenticationStore';

interface Notice {
  id: number;
  title: string;
  content: string;
  created_date_time: string;
}

const NoticeDetail: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthenticationStore();
  const memberRole = user?.role || 'USER';

  const {
    currentNotice,
    isLoading,
    error,
    fetchNoticeById,
    updateNotice,
    deleteNotice,
    clearError,
  } = useNoticeStore();

  useEffect(() => {
    const loadNotice = async () => {
      if (!id) return;

      try {
        await fetchNoticeById(parseInt(id, 10));
      } catch (error) {
        console.error('공지사항 로딩 실패:', error);
      }
    };

    loadNotice();

    // 컴포넌트 언마운트 시 에러 초기화
    return () => {
      clearError();
    };
  }, [fetchNoticeById, clearError, id]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-3 text-gray-600">
              공지사항 정보를 불러오는 중...
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
              to="/notices"
              className="text-green-600 hover:text-green-700 underline"
            >
              공지사항 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentNotice) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-red-200/50 p-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">
              공지사항을 찾을 수 없습니다
            </div>
            <Link
              to="/notices"
              className="text-green-600 hover:text-green-700 underline"
            >
              공지사항 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const openEditModal = (notice: Notice) => {
    setIsEditModalOpen(true);
    setSelectedNotice(notice);
  };

  const openDeleteModal = (notice: Notice) => {
    setIsDeleteModalOpen(true);
    setSelectedNotice(notice);
  };

  const handleNoticeEdit = async (data: any) => {
    console.log('공지사항 수정:', data);
    try {
      if (selectedNotice) {
        await updateNotice(selectedNotice.id, {
          title: data.title,
          content: data.content,
        });
        setIsEditModalOpen(false);
        setSelectedNotice(null);
      }
    } catch (error) {
      console.error('공지사항 수정 실패:', error);
    }
  };

  const handleNoticeDelete = async () => {
    if (!selectedNotice) return;

    console.log('공지사항 삭제:', selectedNotice);

    try {
      await deleteNotice(selectedNotice.id);
      setIsDeleteModalOpen(false);
      setSelectedNotice(null);
      navigate('/notices');
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link
          to="/notices"
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
          공지사항 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {currentNotice.title}
            </h1>
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                공지사항
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentNotice.noticetype === 'EVENT'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {currentNotice.noticetype === 'EVENT' ? '중요' : '일반'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">작성일</div>
            <div className="text-lg font-medium text-gray-800">
              {new Date(currentNotice.created_date_time).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              공지사항 내용
            </h3>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
              {currentNotice.content}
            </div>
          </div>
        </div>

        {memberRole === 'ADMIN' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                공지사항 관리
              </h3>
              <div className="grid grid-cols-2 gap-40">
                <button
                  className="w-50 px-4 py-3 bg-slate-500 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  onClick={() => openEditModal(currentNotice)}
                  title="수정"
                >
                  공지사항 수정
                </button>

                <button
                  className="w-50 px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  onClick={() => openDeleteModal(currentNotice)}
                  title="삭제"
                >
                  공지사항 삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 공지사항 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedNotice(null);
        }}
        title="공지사항 수정"
        size="lg"
      >
        <NoticeCreateModal
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedNotice(null);
          }}
          onSubmit={handleNoticeEdit}
          isEditMode={true}
          initialData={selectedNotice}
        />
      </Modal>

      {/* 공지사항 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedNotice(null);
        }}
        title="공지사항 삭제"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              <strong>"{selectedNotice?.title}"</strong> 공지사항을
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
                setSelectedNotice(null);
              }}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleNoticeDelete}
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

export default NoticeDetail;
