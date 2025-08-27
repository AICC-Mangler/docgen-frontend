import React from 'react';

const Documents: React.FC = () => {
  const timeline = [
    {
      id: 1,
      title: '프로젝트 계획서',
      description: '기획',
      event_date: '2025-01-15',
    },
    {
      id: 2,
      title: '회의록 - 1월 정기회의',
      description: '회의',
      event_date: '2025-01-14',
    },
    {
      id: 3,
      title: '사용자 매뉴얼 v2.0',
      description: '매뉴얼',
      event_date: '2025-01-13',
    },
    {
      id: 4,
      title: '분기별 실적 보고서',
      description: '보고서',
      event_date: '2025-01-12',
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

        {/* 필터 및 검색 */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="타임라인 검색..."
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-300"
            />
          </div>
        </div>

        {/* 타임라인 */}
        <div className="overflow-x-auto"></div>
      </div>
    </div>
  );
};

export default Documents;
