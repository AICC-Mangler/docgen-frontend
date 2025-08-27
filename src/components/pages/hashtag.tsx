import React from 'react';

const Hashtag: React.FC = () => {
  const hashtags = [
    {
      id: 1,
      name: '#프로젝트',
      count: 156,
      color: 'bg-blue-500',
      documents: [
        '프로젝트 계획서',
        '프로젝트 진행상황',
        '프로젝트 완료보고서',
      ],
    },
    {
      id: 2,
      name: '#회의',
      count: 89,
      color: 'bg-green-500',
      documents: ['정기회의록', '프로젝트 킥오프 회의', '주간 진행상황 회의'],
    },
    {
      id: 3,
      name: '#기획',
      count: 67,
      color: 'bg-purple-500',
      documents: ['서비스 기획서', '마케팅 전략', '사업 계획서'],
    },
    {
      id: 4,
      name: '#개발',
      count: 123,
      color: 'bg-orange-500',
      documents: ['개발 가이드라인', 'API 문서', '시스템 아키텍처'],
    },
    {
      id: 5,
      name: '#디자인',
      count: 45,
      color: 'bg-pink-500',
      documents: ['UI/UX 가이드', '브랜드 가이드라인', '디자인 시스템'],
    },
    {
      id: 6,
      name: '#마케팅',
      count: 78,
      color: 'bg-red-500',
      documents: ['마케팅 전략', '광고 캠페인', '고객 분석 보고서'],
    },
  ];

  const recentDocuments = [
    {
      id: 1,
      title: '프로젝트 계획서 v2.0',
      hashtags: ['#프로젝트', '#기획'],
      author: '김철수',
      createdAt: '2025-01-15',
    },
    {
      id: 2,
      title: '1월 정기회의록',
      hashtags: ['#회의', '#프로젝트'],
      author: '이영희',
      createdAt: '2025-01-14',
    },
    {
      id: 3,
      title: '개발 가이드라인',
      hashtags: ['#개발', '#문서'],
      author: '박민수',
      createdAt: '2025-01-13',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 해시태그 통계 */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              해시태그 관리
            </h1>
            <p className="text-gray-600">
              문서를 체계적으로 분류하고 검색할 수 있는 태그를 관리하세요.
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg">
            새 태그 생성
          </button>
        </div>

        {/* 해시태그 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hashtags.map((tag) => (
            <div
              key={tag.id}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200/50 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 text-sm font-medium text-white rounded-full ${tag.color}`}
                >
                  {tag.name}
                </span>
                <span className="text-2xl font-bold text-gray-800">
                  {tag.count}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">연관 문서 수</p>
              <div className="space-y-2">
                {tag.documents.slice(0, 3).map((doc, index) => (
                  <div key={index} className="text-sm text-gray-700 truncate">
                    • {doc}
                  </div>
                ))}
                {tag.documents.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{tag.documents.length - 3}개 더...
                  </div>
                )}
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200">
                  편집
                </button>
                <button className="flex-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 최근 태그된 문서 */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          최근 태그된 문서
        </h2>

        <div className="space-y-4">
          {recentDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50 hover:bg-gray-100/50 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {doc.title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    {doc.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>작성자: {doc.author}</span>
                    <span>작성일: {doc.createdAt}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 태그 검색 및 필터 */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">태그 검색</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="태그나 문서 검색..."
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-300"
            />
          </div>
          <select className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-300">
            <option value="">모든 카테고리</option>
            <option value="프로젝트">프로젝트</option>
            <option value="회의">회의</option>
            <option value="기획">기획</option>
            <option value="개발">개발</option>
          </select>
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors duration-200">
            검색
          </button>
        </div>

        <div className="text-center text-gray-500 py-8">
          검색 결과가 여기에 표시됩니다.
        </div>
      </div>
    </div>
  );
};

export default Hashtag;
