import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../common/Modal';
import NoticeCreateModal from './NoticeCreateModal';
import '../../../styles/main.css';
import { useNoticeStore } from '../../../stores/useNoticeStore';
import { useAuthenticationStore } from '../../../stores/useAuthenticationStore';

const Notice: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);

  const {
    notices,
    isLoading,
    error,
    fetchNoticesAll,
    createNotice,
    updateNotice,
    deleteNotice,
    clearError,
  } = useNoticeStore();

  const { user } = useAuthenticationStore();
  const memberId = user?.id || 0;

  useEffect(() => {
    const loadNotices = async () => {
      try {
        await fetchNoticesAll();
      } catch (error) {
        console.error('공지사항 로딩 실패:', error);
      }
    };

    loadNotices();

    // 컴포넌트 언마운트 시 에러 초기화
    return () => {
      clearError();
    };
  }, [fetchNoticesAll, clearError]);

  const openEditModal = (notice: any) => {
    setSelectedNotice(notice);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (notice: any) => {
    setSelectedNotice(notice);
    setIsDeleteModalOpen(true);
  };

  const handleNoticeSubmit = async (data: any) => {
    console.log('새 공지사항 생성:', data);

    try {
      await createNotice({
        title: data.title,
        content: data.content,
        noticetype: data.noticetype,
        post_date: data.post_date,
        member_id: memberId,
      });
      // 공지사항 생성 성공 후 목록 새로고침
      await fetchNoticesAll();
      // 모달 닫기
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('공지사항 생성 실패:', error);
    }
  };

  const handleNoticeEdit = async (data: any) => {
    console.log('공지사항 수정:', data);

    try {
      await updateNotice(selectedNotice.id, {
        title: data.title,
        content: data.content,
        noticetype: data.noticetype,
        post_date: data.post_date,
      });
      // 공지사항 수정 성공 후 목록 새로고침
      await fetchNoticesAll();
      // 모달 닫기
      setIsEditModalOpen(false);
      setSelectedNotice(null);
    } catch (error) {
      console.error('공지사항 수정 실패:', error);
    }
  };

  const handleNoticeDelete = async () => {
    if (!selectedNotice) return;

    console.log('공지사항 삭제:', selectedNotice);

    try {
      await deleteNotice(selectedNotice.id);
      // 공지사항 삭제 성공 후 목록 새로고침
      await fetchNoticesAll();
      // 모달 닫기
      setIsDeleteModalOpen(false);
      setSelectedNotice(null);
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
    }
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-3 text-gray-600">
              공지사항 목록을 불러오는 중...
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
          {!notices || notices.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              등록된 공지사항이 없습니다.
            </div>
          ) : (
            notices
              .filter((notice) => notice && notice.id) // undefined나 id가 없는 notice 필터링
              .map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50 hover:bg-gray-100/50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        to={`/notices/${notice.id}`}
                        className="block hover:text-green-600 transition-colors duration-200"
                      >
                        <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                          {notice.title}
                        </h3>
                      </Link>
                      <p
                        className="text-sm text-gray-600 mb-3 leading-relaxed overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {notice.content}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notice.noticetype === 'EVENT'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {notice.noticetype === 'EVENT' ? '중요' : '일반'}
                        </span>
                        <span>
                          공지일:{' '}
                          {new Date(notice.post_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {/* 액션 아이콘들 */}
                      <div className="flex-shrink-0 flex flex-col gap-2 ml-4 mt-2">
                        <button
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                          onClick={() => openEditModal(notice)}
                          title="수정"
                        >
                          <span className="text-gray-600 text-sm font-bold">
                            ✏️
                          </span>
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                          onClick={() => openDeleteModal(notice)}
                          title="삭제"
                        >
                          <span className="text-gray-600 text-sm">🗑️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
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

      {/* 공지사항 생성 모달 */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="공지사항 생성"
        size="lg"
      >
        <NoticeCreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleNoticeSubmit}
        />
      </Modal>

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

export default Notice;
