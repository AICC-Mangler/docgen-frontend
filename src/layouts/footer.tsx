import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-t border-green-200/50">
      <div className="max-w-full mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                Docgen
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              문서 관리 시스템으로 비즈니스 효율성을 극대화하세요. 안전하고
              직관적인 플랫폼을 제공합니다.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 text-green-600 hover:text-green-700 hover:bg-white/60 rounded-xl transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 text-green-600 hover:text-green-700 hover:bg-white/60 rounded-xl transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 text-green-600 hover:text-green-700 hover:bg-white/60 rounded-xl transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-800">빠른 링크</h3>
            <div className="space-y-2">
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
                to="/hashtag"
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
                <span>해시태그</span>
              </Link>
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

        {/* 하단 구분선 */}
        <div className="border-t border-green-200/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 저작권 */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                © 2025{' '}
                <span className="font-semibold text-green-700">Docgen</span>.
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
