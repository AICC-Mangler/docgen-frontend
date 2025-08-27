import React from 'react';

const Documents: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: '프로젝트 이름1',
    },
    {
      id: 2,
      title: '프로젝트 이름2',
    },
    {
      id: 3,
      title: '프로젝트 이름3',
    },
    {
      id: 4,
      title: '프로젝트 이름4',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">타임라인</h1>
            <p className="text-gray-600">
              프로젝트 관련 모든 타임라인을 관리하세요.
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg">
            타임라인 생성
          </button>
        </div>

        {/* 프로젝트 선택 */}
        <div className="flex md:flex-row gap-4 mb-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-green-50 p-4 rounded-xl border border-green-200/50"
            >
              {project.title}
            </div>
          ))}
        </div>

        {/* 타임라인 */}
        <div className="overflow-x-auto"></div>
      </div>
    </div>
  );
};

export default Documents;
