import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          페이지 컴포넌트
        </h1>
        <p className="text-gray-600 mb-6">
          이것은 새로운 페이지 컴포넌트입니다.
        </p>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            환영합니다!
          </h2>
          <p className="text-green-700 leading-relaxed">
            문서 관리 시스템에 오신 것을 환영합니다. 이 시스템을 통해 프로젝트
            문서를 효율적으로 관리하고 팀원들과 협업할 수 있습니다.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200/50">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              빠른 시작
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li>• 새 문서 생성하기</li>
              <li>• 기존 문서 검색하기</li>
              <li>• 팀원 초대하기</li>
              <li>• 프로젝트 설정하기</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200/50">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              주요 기능
            </h3>
            <ul className="space-y-2 text-purple-700">
              <li>• 실시간 협업 편집</li>
              <li>• 버전 관리</li>
              <li>• 권한 설정</li>
              <li>• 알림 시스템</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
