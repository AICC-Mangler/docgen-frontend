import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticationStore } from '../../stores/useAuthenticationStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading } = useAuthenticationStore();

  // 인증 상태 로딩 중
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <span className="ml-3 text-gray-600">인증 상태를 확인하는 중...</span>
      </div>
    );
  }

  // 인증되지 않은 경우 리다이렉트
  console.log('isAuthenticated = ' + isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
