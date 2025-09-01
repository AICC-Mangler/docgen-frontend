import React, { useState } from 'react';
import { useModalStore } from '../../../stores/useModalStore';

const MyPagePasswordModal: React.FC = () => {
  const { isMyPagePasswordModalOpen, closeMyPagePasswordModal } =
    useModalStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('비밀번호를 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: API 호출하여 비밀번호 확인
      // const response = await verifyPassword(password);

      // 임시로 1초 후 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 비밀번호 확인 성공 시 모달 닫기
      closeMyPagePasswordModal();
      // 마이페이지는 이미 열려있으므로 추가 이동 불필요
    } catch {
      setError('비밀번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    closeMyPagePasswordModal();
  };

  if (!isMyPagePasswordModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-white border-none text-gray-400 hover:text-black p-2"
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

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">
              비밀번호 확인
            </h2>
            <p className="text-gray-600">
              접속을 위해 비밀번호를 입력해 주세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-4 text-sm bg-white border border-black rounded-lg focus:border-green-500 text-gray-800 placeholder-gray-500"
                placeholder="비밀번호를 입력해 주세요."
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-left">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 border-black bg-white text-black font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
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
                  확인 중...
                </div>
              ) : (
                '확인'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700 underline focus:outline-none border-none bg-transparent"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPagePasswordModal;
