import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../../stores/useAuthenticationStore';
import { useMemberStore } from '../../stores/useMemberStore';
import { useModalStore } from '../../stores/useModalStore';
import MembershipCancelModal from './Member/MembershipCancelModal';
import MyPagePasswordModal from './Member/MyPagePasswordModal';
import WithdrawModal from './Member/WithdrawModal';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signout, isAuthenticated } = useAuthenticationStore();
  const { updatePassword } = useMemberStore();
  const {
    openWithdrawModal,
    openMyPagePasswordModal,
    isPasswordVerified: modalPasswordVerified,
  } = useModalStore();
  const [activeSubSection, setActiveSubSection] =
    useState<string>('profile-edit');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  // 비밀번호 변경 상태
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 비밀번호 표시/숨김 상태
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 결제 정보 변경 상태
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isMembershipCancelModalOpen, setIsMembershipCancelModalOpen] =
    useState(false);

  // 인증 상태 확인
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!modalPasswordVerified) {
      // 로그인은 되어 있지만 비밀번호 확인이 안 된 경우
      openMyPagePasswordModal();
    }
  }, [
    isAuthenticated,
    navigate,
    modalPasswordVerified,
    openMyPagePasswordModal,
  ]);

  // 비밀번호 확인 상태 동기화
  useEffect(() => {
    if (modalPasswordVerified && !isPasswordVerified) {
      setIsPasswordVerified(true);
    }
  }, [modalPasswordVerified, isPasswordVerified]);

  // 로그인하지 않은 경우 로딩 화면 표시
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  // 임시 사용자 데이터 (실제로는 API에서 가져올 예정)
  const userData = {
    name: user?.name || '홍길동',
    email: user?.email || 'test@naver.com',
    joinDate: '2025.08.01',
    membership: '프리미엄',
    paymentMethod: '신용카드',
  };

  // 멤버십 등급에 따른 색상 및 혜택 매핑
  const getMembershipConfig = (membership: string) => {
    switch (membership) {
      case '프리미엄':
        return {
          colors: {
            primary: 'from-purple-400 to-pink-400',
            secondary: 'from-purple-500 to-pink-500',
            background: 'from-purple-50 to-pink-50',
            badge: 'from-purple-500 to-pink-500',
            icon: 'bg-purple-100',
            iconColor: 'text-purple-600',
          },
          benefits: ['무제한 문서 생성', '고급 템플릿 사용', '우선 고객 지원'],
        };
      case '베이직':
        return {
          colors: {
            primary: 'from-blue-400 to-cyan-400',
            secondary: 'from-blue-500 to-cyan-500',
            background: 'from-blue-50 to-cyan-50',
            badge: 'from-blue-500 to-cyan-500',
            icon: 'bg-blue-100',
            iconColor: 'text-blue-600',
          },
          benefits: [
            '월 50개 문서 생성',
            '기본 템플릿 사용',
            '이메일 고객 지원',
          ],
        };
      case '스타터':
        return {
          colors: {
            primary: 'from-gray-400 to-slate-400',
            secondary: 'from-gray-500 to-slate-500',
            background: 'from-gray-50 to-slate-50',
            badge: 'from-gray-500 to-slate-500',
            icon: 'bg-gray-100',
            iconColor: 'text-gray-600',
          },
          benefits: ['월 10개 문서 생성', '제한된 템플릿', '커뮤니티 지원'],
        };
      default:
        return {
          colors: {
            primary: 'from-gray-400 to-slate-400',
            secondary: 'from-gray-500 to-slate-500',
            background: 'from-gray-50 to-slate-50',
            badge: 'from-gray-500 to-slate-500',
            icon: 'bg-gray-100',
            iconColor: 'text-gray-600',
          },
          benefits: ['기본 기능 사용', '제한된 템플릿', '커뮤니티 지원'],
        };
    }
  };

  const membershipConfig = getMembershipConfig(userData.membership);

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(e.target.value);
    setCurrentPasswordError('');
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setNewPasswordError('');
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const validatePassword = (password: string) => {
    const hasEnglish = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 32;

    return hasEnglish && hasNumber && hasSpecial && isValidLength;
  };

  const handlePasswordSubmit = async () => {
    // 유효성 검사
    let hasError = false;

    if (!currentPassword.trim()) {
      setCurrentPasswordError('올바른 비밀번호를 입력해 주세요.');
      hasError = true;
    }

    if (!newPassword.trim()) {
      setNewPasswordError('영문+숫자+특수문자 포함');
      hasError = true;
    } else if (!validatePassword(newPassword)) {
      setNewPasswordError(
        '영문+숫자+특수문자 포함\n8자 이상 32자 이하로 작성해 주세요.',
      );
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      // useAuthenticationStore의 updatePassword 함수 사용
      await updatePassword(
        user?.id || 1, // 사용자 ID
        currentPassword,
        newPassword,
        confirmPassword,
      );

      // 성공 시 폼 초기화
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '비밀번호 변경에 실패했습니다.';
      if (errorMessage.includes('현재 비밀번호가 일치하지 않습니다')) {
        setCurrentPasswordError('현재 비밀번호가 올바르지 않습니다.');
      } else {
        setCurrentPasswordError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = () => {
    // 회원 탈퇴 모달 열기 (탈퇴 완료 후 콜백 함수 전달)
    openWithdrawModal(handleWithdrawComplete);
  };

  const handleWithdrawComplete = () => {
    // 로그아웃 처리
    signout();
    // 인트로 화면으로 이동
    navigate('/');
  };

  const handleMembershipCancel = () => {
    setIsMembershipCancelModalOpen(true);
  };

  const handleMembershipCancelConfirm = () => {
    // TODO: 실제 멤버십 해지 API 호출
    alert('멤버십이 해지되었습니다.');
    setIsMembershipCancelModalOpen(false);
  };

  const handleMembershipCancelClose = () => {
    setIsMembershipCancelModalOpen(false);
  };

  const sidebarItems = [
    {
      section: 'profile',
      title: '회원 정보',
      items: [{ id: 'profile-edit', label: '회원 정보 수정' }],
    },
    {
      section: 'membership',
      title: '멤버십',
      items: [
        { id: 'membership-detail', label: '멤버십 상세 정보' },
        { id: 'payment', label: '결제 정보' },
      ],
    },
  ];

  const renderMainContent = () => {
    switch (activeSubSection) {
      case 'profile-edit':
        return (
          <div className="space-y-6 min-h-[700px]">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black">회원 정보</h2>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 기본 정보 카드 */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      기본 정보
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-gray-400 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">
                          이름
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {userData.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-gray-400 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">
                          이메일
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {userData.email}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-gray-400 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">
                          가입일
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {userData.joinDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 계정 보안 카드 */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      계정 보안
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-gray-400 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">
                          비밀번호
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveSubSection('password-change')}
                        className="px-3 py-1 text-sm text-yellow-300 bg-white border border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 text-black font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      >
                        변경하기
                      </button>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm text-blue-800 font-medium">
                          보안 팁
                        </span>
                      </div>
                      <p className="text-xs text-blue-700 mt-3">
                        정기적으로 비밀번호를 변경하여 계정을 보호하세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 탈퇴하기 버튼 */}
            <div className="flex justify-end">
              <button
                onClick={handleWithdraw}
                className="px-6 py-3 text-sm mt-60 bg-white border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
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
                  회원 탈퇴
                </div>
              </button>
            </div>
          </div>
        );

      case 'password-change':
        return (
          <div className="space-y-6 min-h-[700px]">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black">비밀번호 변경</h2>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  {/* 현재 비밀번호 */}
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-3 h-3 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <label className="text-sm font-semibold text-gray-800">
                        현재 비밀번호
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        placeholder="현재 비밀번호를 입력해 주세요."
                        className="w-full px-4 py-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-500 transition-colors duration-200"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                      >
                        {showCurrentPassword ? (
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
                    {currentPasswordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {currentPasswordError}
                      </p>
                    )}
                  </div>

                  {/* 변경 비밀번호 */}
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <label className="text-sm font-semibold text-gray-800">
                        변경 비밀번호
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        placeholder="새 비밀번호를 입력해 주세요."
                        className="w-full px-4 py-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-800 placeholder-gray-500 transition-colors duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                      >
                        {showNewPassword ? (
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
                    {newPasswordError && (
                      <p className="text-red-500 text-sm mt-1 whitespace-pre-line">
                        {newPasswordError}
                      </p>
                    )}
                  </div>

                  {/* 비밀번호 확인 */}
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-3 h-3 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <label className="text-sm font-semibold text-gray-800">
                        변경 비밀번호 확인
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="새 비밀번호를 다시 입력해 주세요."
                        className="w-full px-4 py-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-800 placeholder-gray-500 transition-colors duration-200"
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
                    {confirmPasswordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {confirmPasswordError}
                      </p>
                    )}
                  </div>
                </div>

                {/* 비밀번호 보안 팁 */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-4 h-4 text-blue-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-blue-800">
                      보안 팁
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-blue-700">
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-center">
                        영문 + 숫자 + 특수문자 포함
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-center">8자 이상 32자 이하</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-center">개인정보 포함 금지</span>
                    </div>
                  </div>
                </div>

                {/* 변경하기 버튼 */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handlePasswordSubmit}
                    disabled={isLoading}
                    className="px-3 py-1 text-sm text-yellow-500 bg-white border border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 text-black font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        변경 중...
                      </div>
                    ) : (
                      '변경하기'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'membership-detail':
        return (
          <div className="space-y-6 min-h-[700px]">
            <div className="flex items-center mb-8">
              <div
                className={`w-10 h-10 ${membershipConfig.colors.icon} rounded-full flex items-center justify-center mr-4`}
              >
                <svg
                  className={`w-6 h-6 ${membershipConfig.colors.iconColor}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black">
                멤버십 상세 정보
              </h2>
            </div>
            <div
              className={`bg-gradient-to-br ${membershipConfig.colors.background} rounded-xl p-6 mb-8`}
            >
              {/* 멤버십 상태 카드 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${membershipConfig.colors.primary} rounded-full flex items-center justify-center mr-3`}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      현재 멤버십
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 bg-gradient-to-r ${membershipConfig.colors.badge} text-white text-sm font-medium rounded-full`}
                  >
                    {userData.membership}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">
                        멤버십 등급
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      프리미엄
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">
                        월 요금
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      29,900원
                    </span>
                  </div>
                </div>
              </div>

              {/* 결제 정보 카드 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    결제 일정
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">
                        다음 결제일
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      2025.09.01
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">
                        만료일
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      2025.12.31
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 멤버십 혜택 안내 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
              <div className="flex items-center mb-3">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-semibold text-green-800">
                  {userData.membership} 멤버십 혜택
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-green-700">
                {membershipConfig.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-center">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleMembershipCancel}
                className="px-20 py-3 text-sm bg-white border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-sm"
              >
                멤버십 해지
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6 min-h-[700px]">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black">결제 정보</h2>
            </div>

            {!showPaymentForm ? (
              <>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
                  {/* 결제 수단 카드 */}
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        결제 수단
                      </h3>
                    </div>

                    <div className="flex items-center justify-between py-4 px-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {userData.paymentMethod}
                          </p>
                          <p className="text-xs text-gray-500">
                            •••• •••• •••• 1234
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPaymentForm(true)}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200"
                      >
                        변경
                      </button>
                    </div>
                  </div>

                  {/* 결제 일정 카드 */}
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        결제 일정
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-600">
                            다음 결제일
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          2025.09.01
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-600">
                            결제 금액
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          29,900원
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-600">
                            결제 주기
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          월간
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 결제 내역 안내 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                  <div className="flex items-center mb-3">
                    <svg
                      className="w-5 h-5 text-blue-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-blue-800">
                      결제 내역
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-blue-700">
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-center">최근 3개월 내역 조회</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-center">영수증 다운로드</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-center">자동 결제 관리</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* 결제 정보 입력 폼 */
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    결제 정보 입력
                  </h3>
                  <button
                    onClick={() => setShowPaymentForm(false)}
                    className="bg-white text-gray-400 p-1.5 rounded focus:outline-none hover:text-black border-none transition-colors duration-200"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* 카드사 로고 */}
                <div className="mb-6 text-black">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      'BC',
                      'NH',
                      '롯데',
                      'KB',
                      '신한',
                      '삼성',
                      '현대',
                      '우리',
                    ].map((card) => (
                      <div
                        key={card}
                        className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 입력 필드들 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카드 번호
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="카드 번호"
                        className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        유효기간
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="유효기간"
                        className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이름
                      </label>
                      <input
                        type="text"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="이름"
                        className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      생년월일
                    </label>
                    <input
                      type="text"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      placeholder="생년월일"
                      className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* 동의 체크박스 */}
                <div className="mt-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      본인의 개인 정보를{' '}
                      <span className="text-blue-600 font-medium">
                        결제 서비스업체
                      </span>
                      에 제공하는 데에 동의합니다.
                    </span>
                  </label>
                </div>

                {/* 저장 버튼 */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      // TODO: 실제 저장 로직 구현
                      setShowPaymentForm(false);
                    }}
                    className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    저장
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {!isPasswordVerified ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">마이페이지 로딩 중...</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-8">
          {/* 사이드바 */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h1 className="text-xl font-bold text-black mb-6">
                  마이페이지
                </h1>

                <nav className="space-y-6">
                  {sidebarItems.map((section) => (
                    <div key={section.section}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => setActiveSubSection(item.id)}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                                activeSubSection === item.id
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'bg-white text-black hover:bg-blue-50 hover:text-blue-700 hover:font-medium'
                              }`}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {renderMainContent()}
            </div>
          </div>

          {/* 멤버십 해지 모달 */}
          <MembershipCancelModal
            isOpen={isMembershipCancelModalOpen}
            onClose={handleMembershipCancelClose}
            onConfirm={handleMembershipCancelConfirm}
          />

          {/* 회원 탈퇴 모달 */}
          <WithdrawModal />
        </div>
      )}

      {/* 비밀번호 확인 모달 */}
      <MyPagePasswordModal />
    </>
  );
};

export default MyPage;
