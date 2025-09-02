import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const IdFindPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일을 입력해 주세요.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handleSubmit = async () => {
    if (validateEmail()) {
      setIsLoading(true);
      try {
        // TODO: 실제 아이디 찾기 API 호출
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 딜레이

        // 성공 시 처리 (예: 이메일 발송 완료 페이지로 이동)
        alert('등록하신 이메일로 아이디가 발송되었습니다.');
        navigate('/login');
      } catch (error) {
        console.error('아이디 찾기 오류:', error);
        alert('아이디 찾기에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto py-12 px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">DocGen</h1>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            아이디 찾기
          </h2>
          <p className="text-sm text-gray-600">
            등록하신 이메일로 아이디를 전송해 드립니다.
          </p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="p-8">
          {/* 이메일 입력 폼 */}
          <div className="space-y-4 mb-6">
            {/* 이메일 입력 */}
            <div>
              <input
                type="email"
                placeholder="이메일을 입력해 주세요."
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 text-sm bg-white border border-black rounded-lg focus:border-green-500 text-gray-800 placeholder-gray-500"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* 다음 버튼 */}
          <div className="space-y-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 border-black bg-white text-black font-medium rounded-lg transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '처리 중...' : '다음'}
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                비밀번호가 기억나지 않는다면?{' '}
              </span>
              <Link
                to="/password-find"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdFindPage;
