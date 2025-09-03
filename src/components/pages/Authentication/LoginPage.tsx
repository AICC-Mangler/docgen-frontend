import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../../../stores';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signin, isLoading, error } = useAuthenticationStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // 비밀번호 표시/숨김 상태
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일을 입력해 주세요.';
    }

    // 비밀번호 검증
    if (formData.password.length < 8) {
      newErrors.password = '올바른 비밀번호를 입력해 주세요.';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      // 실시간 유효성 검사
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }
    };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        console.log('로그인 진행:', formData);
        await signin({
          email: formData.email,
          password: formData.password,
        });
        console.log('로그인 성공! 토큰 확인:', {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
        });
        // 로그인 성공 시 대시보드로 이동
        navigate('/dashboard');
      } catch (error) {
        console.error('로그인 실패:', error);
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
          <h2 className="text-lg font-semibold text-gray-800 mb-2">로그인</h2>
          <p className="text-sm text-gray-600">
            계정에 로그인하여 서비스를 이용하세요.
          </p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="p-8">
          {/* 로그인 폼 */}
          <div className="space-y-4 mb-6">
            {/* 이메일 입력 */}
            <div>
              <input
                type="email"
                placeholder="이메일을 입력해 주세요."
                value={formData.email}
                onChange={handleInputChange('email')}
                className="w-full px-4 py-3 text-sm bg-white border border-black rounded-lg focus:border-green-500 text-gray-800 placeholder-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해 주세요."
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 pr-12 text-sm bg-white border border-black rounded-lg focus:border-green-500 text-gray-800 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
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
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* 추가 옵션들 */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                로그인 상태 유지
              </span>
            </label>
            <Link
              to="/password-find"
              className="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none border-none bg-transparent"
            >
              아이디/비밀번호 찾기
            </Link>
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* 에러 메시지 표시 */}
          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}

          {/* 로그인 버튼 */}
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 font-medium rounded-lg transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'border-black bg-white text-black hover:bg-gray-50'
              }`}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                아직 회원이 아니시라면?{' '}
              </span>
              <Link
                to="/signup"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                회원가입 하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
