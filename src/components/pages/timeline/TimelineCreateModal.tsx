import React, { useState, useEffect } from 'react';
import '../../../styles/main.css';

interface TimelineCreateModalProps {
  onClose: () => void;
  onSubmit: (data: TimelineFormData) => void;
  isEditMode?: boolean;
  initialData?: TimelineFormData;
}

interface TimelineFormData {
  title: string;
  description: string;
  event_date: string;
}

const TimelineCreateModal: React.FC<TimelineCreateModalProps> = ({
  onClose,
  onSubmit,
  isEditMode = false,
  initialData,
}) => {
  const [formData, setFormData] = useState<TimelineFormData>({
    title: '',
    description: '',
    event_date: '',
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData(initialData);
    }
  }, [isEditMode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 제목 */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          제목 *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          placeholder="타임라인 제목을 입력하세요"
        />
      </div>

      {/* 설명 */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          설명
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          placeholder="타임라인에 대한 설명을 입력하세요"
        />
      </div>

      {/* 날짜 */}
      <div>
        <label
          htmlFor="event_date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          이벤트 날짜 *
        </label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
        />
      </div>

      {/* 버튼 그룹 */}
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
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          {isEditMode ? '수정' : '생성'}
        </button>
      </div>
    </form>
  );
};

export default TimelineCreateModal;
