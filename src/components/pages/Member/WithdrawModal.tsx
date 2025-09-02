import React, { useState } from 'react';
import { useModalStore } from '../../../stores/useModalStore';
import { useMemberStore } from '../../../stores/useMemberStore';

const WithdrawModal: React.FC = () => {
  const { isWithdrawModalOpen, closeWithdrawModal, withdrawCompleteCallback } =
    useModalStore();
  const { deleteMember, isLoading } = useMemberStore();
  const [isAgreed, setIsAgreed] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showWithdrawComplete, setShowWithdrawComplete] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const handleWithdraw = () => {
    if (!isAgreed) {
      alert('안내사항에 동의해주세요.');
      return;
    }

    setShowPasswordModal(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(e.target.value);
    setPasswordConfirmError('');
  };

  const handlePasswordSubmit = async () => {
    // 비밀번호 유효성 검사
    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해 주세요.');
      return;
    }

    if (!passwordConfirm.trim()) {
      setPasswordConfirmError('비밀번호 확인을 입력해 주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      await deleteMember(password, passwordConfirm);
      setShowPasswordModal(false);
      setShowWithdrawComplete(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '탈퇴에 실패했습니다.';
      setPasswordError(message);
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordConfirm('');
    setPasswordError('');
    setPasswordConfirmError('');
  };

  const handleCloseComplete = () => {
    setShowWithdrawComplete(false);
    setIsAgreed(false);
    closeWithdrawModal();

    // 탈퇴 완료 콜백 함수 호출
    if (withdrawCompleteCallback) {
      withdrawCompleteCallback();
    }
  };

  const handleClose = () => {
    setIsAgreed(false);
    closeWithdrawModal();
  };

  if (!isWithdrawModalOpen) return null;

  // 비밀번호 입력 모달
  if (showPasswordModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClosePasswordModal}
            className="absolute top-4 right-4 bg-white text-gray-400 p-1.5 rounded focus:outline-none hover:text-black border-none transition-colors duration-200"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 헤더 */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">DocGen</h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto mb-4"></div>
            <p className="text-sm text-gray-700">
              회원 탈퇴 진행을 위해 비밀번호를 입력해 주세요.
            </p>
          </div>

          {/* 비밀번호 입력 폼 */}
          <div className="space-y-6">
            {/* 비밀번호 입력 */}
            <div>
              <div className="flex items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  비밀번호
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력해 주세요."
                className="w-full px-4 py-3 text-sm bg-white border border-black rounded-lg focus:border-blue-500 text-gray-800 placeholder-gray-500"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {/* 비밀번호 확인 입력 */}
            <div>
              <div className="flex items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  비밀번호 확인
                </label>
              </div>
              <input
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                placeholder="비밀번호 확인을 위해 재입력해 주세요."
                className="w-full px-4 py-3 text-sm bg-white border border-black rounded-lg focus:border-blue-500 text-gray-800 placeholder-gray-500"
              />
              {passwordConfirmError && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordConfirmError}
                </p>
              )}
            </div>

            {/* 탈퇴 계속하기 버튼 */}
            <div>
              <div className="flex items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  탈퇴 계속하기
                </label>
              </div>
              <button
                onClick={handlePasswordSubmit}
                disabled={isLoading}
                className="w-full py-3 bg-white border border-black text-black font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
              >
                탈퇴 계속하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 탈퇴 완료 모달
  if (showWithdrawComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative">
          {/* 닫기 버튼 */}
          <button
            onClick={handleCloseComplete}
            className="absolute top-4 right-4 bg-gray-100 text-gray-400 p-2 rounded focus:outline-none"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">DocGen</h1>
            </div>
          </div>

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
            <p className="text-gray-800 mb-2">탈퇴가 완료 되었습니다.</p>
            <p className="text-gray-600">이용해 주셔서 감사합니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 relative">
        <div className="p-8">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-gray-100 text-gray-400 p-2 rounded focus:outline-none"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* 상단 로고 및 안내 문구 */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">DocGen</h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto mb-4"></div>
            <p className="text-sm text-gray-700">
              회원 탈퇴를 신청하기 전, 아래 내용을 꼭 확인해 주세요.
            </p>
          </div>

          {/* 탈퇴 시 유의사항 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-black mb-3">
              탈퇴 시 유의사항
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                탈퇴 후에는 계정 및 모든 개인 정보가 즉시 삭제됩니다.
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                작성하신 게시물, 댓글은 삭제되지 않으며, 수정 및 삭제가
                불가능합니다.
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                동일 이메일로는 180일 이후에만 재가입이 가능합니다.
              </li>
            </ul>
          </div>

          {/* 동의 체크박스 */}
          <div className="mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 bg-white border-2 border-black rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0"
              />
              <span className="text-sm text-gray-700">
                안내사항을 모두 확인하였으며, 이에 동의합니다.{' '}
                <span className="text-red-500">(필수)</span>
              </span>
            </label>
          </div>

          {/* 최종 확인 질문 */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-black">
              탈퇴를 진행하시겠습니까?
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-4">
            <button
              onClick={handleWithdraw}
              disabled={!isAgreed}
              className="flex-1 py-3 bg-white border border-black text-black font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              예
            </button>
            <button
              onClick={handleClose}
              className="flex-1 py-3 bg-white border border-black text-black font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
