import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../../styles/main.css';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const mockProjects = [
    {
      id: 1,
      title: 'OO 프로젝트',
      introduction: 'AI를 통한 건축 설계 프로젝트',
      description: '이 프로젝트는 인공지능 기술을 활용하여 건축 설계의 효율성을 높이고, 창의적인 디자인 솔루션을 제공하는 것을 목표로 합니다.',
      hashtags: ['건축', '기획', 'AI', '설계'],
      project_status: 'IN_PROGRESS',
      created_date_time: '2025-01-15',
      start_date: '2025-01-15',
      end_date: '2025-06-30',
      team_members: ['김철수', '이영희', '박민수'],
      budget: '50,000,000원',
      progress: 65,
    },
    {
      id: 2,
      title: 'AA 프로젝트',
      introduction: 'AI를 통한 건축 설계 프로젝트',
      description: 'AA 프로젝트는 지속 가능한 건축을 위한 혁신적인 설계 방법론을 연구하고 개발합니다.',
      hashtags: ['건축', '기획', '지속가능', '친환경'],
      project_status: 'PENDING',
      created_date_time: '2024-12-11',
      start_date: '2025-02-01',
      end_date: '2025-08-31',
      team_members: ['최지원', '정수진'],
      budget: '30,000,000원',
      progress: 0,
    },
    {
      id: 3,
      title: 'BB 프로젝트',
      introduction: 'AI를 통한 건축 설계 프로젝트',
      description: 'BB 프로젝트는 전통 건축의 아름다움을 현대적으로 재해석하는 프로젝트입니다.',
      hashtags: ['건축', '기획', '전통', '현대'],
      project_status: 'COMPLETED',
      created_date_time: '2024-09-13',
      start_date: '2024-09-15',
      end_date: '2024-12-31',
      team_members: ['한지민', '송혜교', '배두나'],
      budget: '25,000,000원',
      progress: 100,
    },
  ];

  useEffect(() => {
    console.log('projectId = ' + projectId )
    const foundProject = mockProjects.find(p => p.id === Number(1));
    if (foundProject) {
      setProject(foundProject);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-3 text-gray-600">프로젝트 정보를 불러오는 중...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-red-200/50 p-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">프로젝트를 찾을 수 없습니다</div>
            <Link to="/projects" className="text-green-600 hover:text-green-700 underline">
              프로젝트 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '완료';
      case 'IN_PROGRESS': return '진행중';
      case 'PENDING': return '대기중';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/projects" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          프로젝트 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{project.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{project.introduction}</p>
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.project_status)}`}>
                {getStatusText(project.project_status)}
              </span>
              <span className="text-sm text-gray-500">진행률: {project.progress}%</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">생성일</div>
            <div className="text-lg font-medium text-gray-800">{project.created_date_time}</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">진행률</span>
            <span className="text-sm text-gray-500">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.hashtags.map((tag: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">프로젝트 설명</h3>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">팀 멤버</h3>
            <div className="space-y-2">
              {project.team_members.map((member: string, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">{member.charAt(0)}</span>
                  </div>
                  <span className="text-gray-700">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">프로젝트 일정</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">시작일</span>
                <span className="font-medium text-gray-800">{project.start_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">종료일</span>
                <span className="font-medium text-gray-800">{project.end_date}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">프로젝트 관리</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200">
                프로젝트 수정
              </button>
              <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                타임라인 보기
              </button>
              <button className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200">
                문서 관리
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
