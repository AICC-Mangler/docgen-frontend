import React from 'react';
import { useNavigate } from 'react-router-dom';

const Documents: React.FC = () => {
  const navigate = useNavigate();
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
              프로젝트를 선택해 주세요.
            </p>
          </div>
        </div>

        {/* 프로젝트 선택 */}
        <div className="flex flex-col gap-4 mb-6 text-gray-600">
          {timeline.map((item) => (
                         <div key={item.id} className="flex-1 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/timeline/${item.id}`)}>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-xs text-gray-500">{item.event_date}</p>
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
