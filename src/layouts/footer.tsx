import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-50 border-t border-green-200">
      <div className="max-w-full mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 회사 정보 */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-green-600">
              © 2025 Docgen. All rights reserved.
            </p>
          </div>

          {/* 링크 */}
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-sm text-green-600 hover:text-green-800 transition-colors"
            >
              개인정보처리방침
            </a>
            <a
              href="/terms"
              className="text-sm text-green-600 hover:text-green-800 transition-colors"
            >
              이용약관
            </a>
            <a
              href="/support"
              className="text-sm text-green-600 hover:text-green-800 transition-colors"
            >
              고객지원
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
