import React from 'react';
import { api } from '../api/apiClient';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/common/ToastContainer';

/**
 * apiClient 사용법 예제
 *
 * 이 파일은 apiClient를 사용하여 API 호출과 에러 처리를 하는 방법을 보여줍니다.
 */
const ApiClientUsageExample: React.FC = () => {
  const { toasts, removeToast, showSuccess, showError, showInfo, showWarning } =
    useToast();

  // GET 요청 예제
  const handleGetRequest = async () => {
    try {
      const response = await api.get('/projects');
      console.log('GET 요청 성공:', response.data);
      showSuccess('데이터를 성공적으로 가져왔습니다.');
    } catch (error) {
      console.error('GET 요청 실패:', error);
      showError('데이터를 가져오는데 실패했습니다.');
    }
  };

  // POST 요청 예제
  const handlePostRequest = async () => {
    try {
      const newProject = {
        title: '새 프로젝트',
        introduction: '프로젝트 설명',
        project_status: 'PENDING' as const,
        member_id: 1,
      };

      const response = await api.post('/projects', newProject);
      console.log('POST 요청 성공:', response.data);
      showSuccess('프로젝트가 성공적으로 생성되었습니다.');
    } catch (error) {
      console.error('POST 요청 실패:', error);
      showError('프로젝트 생성에 실패했습니다.');
    }
  };

  // PUT 요청 예제
  const handlePutRequest = async () => {
    try {
      const updateData = {
        title: '수정된 프로젝트',
        introduction: '수정된 설명',
      };

      const response = await api.put('/projects/1', updateData);
      console.log('PUT 요청 성공:', response.data);
      showSuccess('프로젝트가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('PUT 요청 실패:', error);
      showError('프로젝트 수정에 실패했습니다.');
    }
  };

  // DELETE 요청 예제
  const handleDeleteRequest = async () => {
    try {
      const response = await api.delete('/projects/1');
      console.log('DELETE 요청 성공:', response.data);
      showSuccess('프로젝트가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('DELETE 요청 실패:', error);
      showError('프로젝트 삭제에 실패했습니다.');
    }
  };

  // 다양한 토스트 알림 예제
  const showToastExamples = () => {
    showSuccess('성공 메시지입니다!');
    setTimeout(() => showError('에러 메시지입니다!'), 1000);
    setTimeout(() => showWarning('경고 메시지입니다!'), 2000);
    setTimeout(() => showInfo('정보 메시지입니다!'), 3000);
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          API Client 사용법 예제
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">API 요청 예제</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGetRequest}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              GET 요청 테스트
            </button>
            <button
              onClick={handlePostRequest}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              POST 요청 테스트
            </button>
            <button
              onClick={handlePutRequest}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              PUT 요청 테스트
            </button>
            <button
              onClick={handleDeleteRequest}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              DELETE 요청 테스트
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">토스트 알림 예제</h2>
          <button
            onClick={showToastExamples}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            모든 토스트 알림 보기
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">사용법 설명</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold">1. API 요청</h3>
              <p className="text-gray-600">
                apiClient의 get, post, put, delete 메서드를 사용하여 API 요청을
                보냅니다. 자동으로 에러 처리가 되며, 상태 코드별로 적절한 에러
                메시지가 제공됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">2. 에러 처리</h3>
              <p className="text-gray-600">
                try-catch 블록을 사용하여 에러를 처리합니다. apiClient는
                자동으로 HTTP 상태 코드에 따른 에러 메시지를 제공합니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">3. 토스트 알림</h3>
              <p className="text-gray-600">
                useToast 훅을 사용하여 성공, 에러, 경고, 정보 메시지를 표시할 수
                있습니다. ToastContainer 컴포넌트를 렌더링하여 알림을
                표시합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiClientUsageExample;
