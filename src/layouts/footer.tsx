import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-t border-green-200/50">
      <div className="max-w-full mx-auto px-8 py-8">
        <div className="flex flex-row justify-between  gap-6 mb-6 px-52">
          {/* 회사 정보 */}
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                DocGen
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI 기반 문서 생성 및 관리 시스템을 제공합니다.
              <br />
              안전하고 직관적인 플랫폼을 이용하세요.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-24">
            {/* 빠른 링크 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-800">
                빠른 링크
              </h3>
              <div className="space-y-2">
                <Link
                  to="/notices"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-green-500 group-hover:text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>공지사항</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-green-500 group-hover:text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>대시보드</span>
                </Link>
                <Link
                  to="/documents"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-green-500 group-hover:text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>문서 관리</span>
                </Link>
                <Link
                  to="/projects"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-green-500 group-hover:text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>프로젝트</span>
                </Link>
              </div>
            </div>

            {/* 지원 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-800">지원</h3>
              <div className="space-y-2">
                <a
                  href="/help"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-green-500 group-hover:text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>도움말</span>
                </a>
                <a
                  href="/contact"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-green-500 group-hover:text-green-600"
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
                  <span>문의하기</span>
                </a>
                <a
                  href="/feedback"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-green-500 group-hover:text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <span>피드백</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-green-200/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 저작권 */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                © 2025{' '}
                <span className="font-semibold text-green-700">DocGen</span>.
                All rights reserved.
              </p>
            </div>

            {/* 법적 링크 */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a
                href="/privacy"
                className="text-sm text-gray-600 hover:text-green-700 transition-colors duration-200"
              >
                개인정보처리방침
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-600 hover:text-green-700 transition-colors duration-200"
              >
                이용약관
              </a>
              <a
                href="/cookies"
                className="text-sm text-gray-600 hover:text-green-700 transition-colors duration-200"
              >
                쿠키 정책
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
