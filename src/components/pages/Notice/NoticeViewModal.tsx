import React from 'react';

interface Notice {
  id: number;
  title: string;
  content: string;
  created_date_time: string;
}

interface NoticeViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: Notice | null;
}

const NoticeViewModal: React.FC<NoticeViewModalProps> = ({
  isOpen,
  onClose,
  notice,
}) => {
  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {notice.title}
            </h2>
            <p className="text-sm text-gray-500">
              작성일: {notice.created_date_time}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {notice.content}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl transition-all duration-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeViewModal;
