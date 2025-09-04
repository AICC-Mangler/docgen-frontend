import React, { useState } from 'react';

interface MembershipCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const MembershipCancelModal: React.FC<MembershipCancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleConfirm = () => {
    if (!isAgreed) {
      alert('안내사항에 동의해주세요.');
      return;
    }
    onConfirm();
  };

  const handleClose = () => {
    setIsAgreed(false);
    onClose();
  };

  if (!isOpen) return null;

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
              멤버십 해지를 신청하기 전, 아래 내용을 꼭 확인해 주세요.
            </p>
          </div>

          {/* 멤버십 해지 시 유의사항 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-black mb-3">
              멤버십 해지 시 유의사항
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                멤버십 해지 시 즉시 프리미엄 기능이 제한됩니다.
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                이미 생성된 문서는 계속 사용할 수 있습니다.
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                다음 결제일까지 기존 멤버십 혜택을 유지합니다.
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                언제든지 다시 멤버십을 가입할 수 있습니다.
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
                className="mt-1 w-4 h-4 text-orange-600 bg-white border-2 border-black rounded focus:ring-2 focus:ring-offset-0"
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
              멤버십을 해지하시겠습니까?
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-4">
            <button
              onClick={handleConfirm}
              disabled={!isAgreed}
              className="flex-1 py-3 bg-white border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              해지하기
            </button>
            <button
              onClick={handleClose}
              className="flex-1 py-3 bg-white border border-black text-black font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCancelModal;
