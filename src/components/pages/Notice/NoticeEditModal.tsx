import React, { useState, useEffect } from 'react';

interface Notice {
  id: number;
  title: string;
  content: string;
  created_date_time: string;
}

interface NoticeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, notice: { title: string; content: string }) => void;
  notice: Notice | null;
}

const NoticeEditModal: React.FC<NoticeEditModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  notice,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setContent(notice.content);
    }
  }, [notice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notice && title.trim() && content.trim()) {
      onUpdate(notice.id, { title: title.trim(), content: content.trim() });
      onClose();
    }
  };

  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">공지사항 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="edit-title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              제목
            </label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="공지사항 제목을 입력하세요"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              내용
            </label>
            <textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="공지사항 내용을 입력하세요"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl transition-all duration-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeEditModal;
