import React from 'react';

interface NoticeDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noticeTitle: string;
}

const NoticeDeleteModal: React.FC<NoticeDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  noticeTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-2">
            공지사항 삭제
          </h3>

          <p className="text-sm text-gray-500 mb-6">
            <span className="font-medium text-gray-700">"{noticeTitle}"</span>{' '}
            공지사항을 삭제하시겠습니까?
            <br />이 작업은 되돌릴 수 없습니다.
          </p>

          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors duration-200"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDeleteModal;
