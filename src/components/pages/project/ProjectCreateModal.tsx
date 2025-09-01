import React, { useState, useEffect } from 'react';

interface ProjectCreateModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
  initialData?: any;
}

const ProjectCreateModal: React.FC<ProjectCreateModalProps> = ({
  onClose,
  onSubmit,
  isEditMode = false,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    project_status: 'PENDING',
    hashtags: '',
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        title: initialData.title || '',
        introduction: initialData.introduction || '',
        project_status: initialData.project_status || 'PENDING',
        hashtags: initialData.hashtags ? initialData.hashtags.join(', ') : '',
      });
    }
  }, [isEditMode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      hashtags: formData.hashtags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
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
          프로젝트 제목 *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          placeholder="프로젝트 제목을 입력하세요"
        />
      </div>

      <div>
        <label
          htmlFor="introduction"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          프로젝트 소개 *
        </label>
        <textarea
          id="introduction"
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          placeholder="프로젝트에 대한 간단한 소개를 입력하세요"
        />
      </div>

      <div>
        <label
          htmlFor="hashtags"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          해시태그
        </label>
        <input
          type="text"
          id="hashtags"
          name="hashtags"
          value={formData.hashtags}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
          placeholder="쉼표로 구분하여 입력하세요 (예: AI, 건축, 기획)"
        />
        <p className="text-sm text-gray-500 mt-1">
          쉼표로 구분하여 여러 해시태그를 입력할 수 있습니다.
        </p>
      </div>

      <div>
        <label
          htmlFor="project_status"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          프로젝트 상태 *
        </label>
        <select
          id="project_status"
          name="project_status"
          value={formData.project_status}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
        >
          <option value="PENDING">대기중</option>
          <option value="IN_PROGRESS">진행중</option>
          <option value="COMPLETED">완료</option>
        </select>
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

export default ProjectCreateModal;
