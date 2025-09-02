import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../../../stores';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuthenticationStore();
  const [signUpStep, setSignUpStep] = useState<'agreement' | 'form'>(
    'agreement',
  );

  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 이메일 인증 발송 페이지 상태
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  // 비밀번호 표시/숨김 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAgreementChange = (type: keyof typeof agreements) => {
    if (type === 'all') {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        age: newValue,
        terms: newValue,
      });
    } else {
      const newAgreements = {
        ...agreements,
        [type]: !agreements[type],
      };
      setAgreements({
        ...newAgreements,
        all: newAgreements.age && newAgreements.terms,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    // 이름 검증
    if (formData.name.length < 2 || formData.name.length > 4) {
      newErrors.name = '이름을 입력해 주세요';
    }

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일을 입력해 주세요.';
    }

    // 비밀번호 검증 (8자 이상, 영문+숫자+특수문자)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = '올바른 비밀번호를 입력해 주세요.';
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
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

  const handleAgreementSubmit = () => {
    if (!agreements.age || !agreements.terms) {
      alert('필수 약관에 동의해주세요.');
      return;
    }
    setSignUpStep('form');
  };

  const handleFormSubmit = async () => {
    if (validateForm()) {
      try {
        await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.confirmPassword,
        });
        // 회원가입 성공 시 이메일 인증 발송 페이지 표시
        setShowEmailVerification(true);
      } catch (error) {
        console.error('회원가입 실패:', error);
        // 에러 메시지 표시 (useAuth의 error 상태 활용)
      }
    }
  };

  const handleCloseEmailVerification = () => {
    setShowEmailVerification(false);
    navigate('/');
  };

  const handleBackToAgreement = () => {
    setSignUpStep('agreement');
  };

  // 이메일 인증 발송 페이지
  if (showEmailVerification) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto py-12 px-4">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800">Docgen</h1>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              이메일 인증
            </h2>
            <p className="text-sm text-gray-600">회원가입이 완료되었습니다.</p>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="p-8">
            {/* 성공 아이콘 */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* 메시지 */}
            <div className="text-center mb-8">
              <p className="text-gray-800 mb-2">
                <span className="text-blue-600 underline">
                  {formData.email}
                </span>
                으로 이메일을 보냈습니다.
              </p>
              <p className="text-gray-600">이메일을 확인해 주세요.</p>
            </div>

            {/* 확인 버튼 */}
            <button
              onClick={handleCloseEmailVerification}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto py-12 px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Docgen</h1>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            환영합니다!
          </h2>
          <p className="text-sm text-gray-600">
            {signUpStep === 'agreement'
              ? '가입을 위해 아래 약관에 동의해 주세요.'
              : '회원가입을 위해 정보를 입력해 주세요.'}
          </p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="p-8">
          {signUpStep === 'agreement' ? (
            // 약관 동의 단계
            <>
              {/* 약관 동의 섹션 */}
              <div className="space-y-4 mb-6">
                {/* 전체 동의 */}
                <div className="border-b border-gray-200 pb-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreements.all}
                      onChange={() => handleAgreementChange('all')}
                      className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-800">
                        약관 전체 동의하기(선택 동의 포함)
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        선택 사항에 대한 동의를 거부하는 경우에도 서비스는
                        이용이 가능합니다.
                      </p>
                    </div>
                  </label>
                </div>

                {/* 필수 약관들 */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={agreements.age}
                        onChange={() => handleAgreementChange('age')}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-800">
                        만 14세 이상입니다. (필수)
                      </span>
                    </div>
                    <button className="text-xs text-black hover:text-blue-600 focus:outline-none underline border-none bg-transparent">
                      자세히
                    </button>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={agreements.terms}
                        onChange={() => handleAgreementChange('terms')}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-800">
                        독젠 이용 약관 (필수)
                      </span>
                    </div>
                    <button className="text-xs text-black hover:text-blue-600 focus:outline-none underline border-none bg-transparent">
                      자세히
                    </button>
                  </label>
                </div>
              </div>

              {/* 개인정보 보호 안내 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-xs text-gray-600 leading-relaxed">
                  정보주체의 개인정보 및 권리 보호를 위해
                  <br />
                  「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여 안전하게
                  관리하고 있습니다.
                  <br />
                  자세한 사항은 개인정보처리방침에서 확인할 수 있습니다.
                </p>
              </div>

              {/* 액션 버튼들 */}
              <div className="space-y-4">
                <button
                  onClick={handleAgreementSubmit}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  동의하고 본인 인증하기
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    이미 회원이시라면?{' '}
                  </span>
                  <Link
                    to="/login"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    로그인 하기
                  </Link>
                </div>
              </div>
            </>
          ) : (
            // 회원가입 폼 단계
            <>
              {/* 뒤로가기 버튼 */}
              <div className="mb-6">
                <button
                  onClick={handleBackToAgreement}
                  className="flex justify-start text-left text-sm text-black bg-gray-50 border-none pl-0"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  약관 동의로 돌아가기
                </button>
              </div>

              {/* 회원가입 폼 */}
              <div className="space-y-4 mb-6">
                {/* 이름 입력 */}
                <div>
                  <input
                    type="text"
                    placeholder="이름을 입력해 주세요."
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    className="w-full px-4 py-3 text-sm bg-white border border-black rounded-lg focus:border-green-500 text-gray-800 placeholder-gray-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* 비밀번호 확인 입력 */}
                <div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="비밀번호 확인을 위해 재입력해 주세요."
                      value={formData.confirmPassword}
                      onChange={handleInputChange('confirmPassword')}
                      className="w-full px-4 py-3 pr-12 text-sm bg-white border border-black rounded-lg focus:ring-2 focus:border-green-500 text-gray-800 placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                    >
                      {showConfirmPassword ? (
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
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* 에러 메시지 표시 */}
              {error && (
                <div className="text-red-500 text-sm text-center mb-4">
                  {error}
                </div>
              )}

              {/* 액션 버튼들 */}
              <div className="space-y-4">
                <button
                  onClick={handleFormSubmit}
                  disabled={isLoading}
                  className={`w-full py-3 font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                  }`}
                >
                  {isLoading ? '처리 중...' : '회원가입'}
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    이미 회원이시라면?{' '}
                  </span>
                  <Link
                    to="/login"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    로그인 하기
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
