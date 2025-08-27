import React from 'react';

const Documents: React.FC = () => {
  const documents = [
    {
      id: 1,
      title: '프로젝트 계획서',
      category: '기획',
      author: '김철수',
      createdAt: '2025-01-15',
      status: '진행중',
      size: '2.3MB',
    },
    {
      id: 2,
      title: '회의록 - 1월 정기회의',
      category: '회의',
      author: '이영희',
      createdAt: '2025-01-14',
      status: '완료',
      size: '1.1MB',
    },
    {
      id: 3,
      title: '사용자 매뉴얼 v2.0',
      category: '매뉴얼',
      author: '박민수',
      createdAt: '2025-01-13',
      status: '검토중',
      size: '5.7MB',
    },
    {
      id: 4,
      title: '분기별 실적 보고서',
      category: '보고서',
      author: '최지영',
      createdAt: '2025-01-12',
      status: '완료',
      size: '3.2MB',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'bg-blue-100 text-blue-800';
      case '완료':
        return 'bg-green-100 text-green-800';
      case '검토중':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">문서 목록</h1>
            <p className="text-gray-600">
              프로젝트 관련 모든 문서를 관리하세요.
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg">
            새 문서 생성
          </button>
        </div>

        {/* 필터 및 검색 */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="문서 검색..."
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-300"
            />
          </div>
          <select className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-300">
            <option value="">모든 카테고리</option>
            <option value="기획">기획</option>
            <option value="회의">회의</option>
            <option value="매뉴얼">매뉴얼</option>
            <option value="보고서">보고서</option>
          </select>
          <select className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-300">
            <option value="">모든 상태</option>
            <option value="진행중">진행중</option>
            <option value="완료">완료</option>
            <option value="검토중">검토중</option>
          </select>
        </div>

        {/* 문서 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-200/50">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  제목
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  카테고리
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  작성자
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  생성일
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  상태
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  크기
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  작업
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-green-100/50 hover:bg-green-50/30 transition-colors duration-200"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{doc.title}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{doc.author}</td>
                  <td className="py-4 px-4 text-gray-600">{doc.createdAt}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${getStatusColor(doc.status)}`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{doc.size}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
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
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documents;
