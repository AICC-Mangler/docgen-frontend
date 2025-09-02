import React, { useState, useEffect } from 'react';

enum NoticeType {
  NOMAL = 'NOMAL',
  EVENT = 'EVENT',
}

interface NoticeCreateModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
  initialData?: any;
  memberId?: number;
}

const NoticeCreateModal: React.FC<NoticeCreateModalProps> = ({
  onClose,
  onSubmit,
  isEditMode = false,
  initialData = null,
  memberId,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    noticetype: NoticeType.NOMAL,
    post_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      let formattedDate = new Date().toISOString().split('T')[0]; // 기본값

      if (initialData.post_date) {
        try {
          // Date 객체이거나 문자열인 경우 처리
          const date = new Date(initialData.post_date);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toISOString().split('T')[0];
          }
        } catch (error) {
          console.error('날짜 변환 오류:', error);
        }
      }

      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        noticetype: initialData.noticetype || NoticeType.NOMAL,
        post_date: formattedDate,
      });
    }
  }, [isEditMode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      member_id: memberId, // memberId를 포함
    };
    onSubmit(submitData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          공지사항 제목 *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          placeholder="공지사항 제목을 입력하세요"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          공지사항 내용 *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          placeholder="공지사항 내용을 입력하세요"
        />
      </div>

      <div>
        <label
          htmlFor="noticetype"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          공지사항 중요도 *
        </label>
        <select
          id="noticetype"
          name="noticetype"
          value={formData.noticetype}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
        >
          <option value={NoticeType.NOMAL}>보통</option>
          <option value={NoticeType.EVENT}>중요</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="post_date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          게시 날짜 *
        </label>
        <input
          type="date"
          id="post_date"
          name="post_date"
          value={formData.post_date}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          {isEditMode ? '수정' : '생성'}
        </button>
      </div>
    </form>
  );
};

export default NoticeCreateModal;
