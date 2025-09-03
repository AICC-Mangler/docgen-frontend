import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import type { ApiError } from '../types/api';

// API 기본 설정
export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_DEV_URL ||
  import.meta.env.VITE_BACKEND_LOCAL_URL ||
  'http://localhost:3100';
const API_TIMEOUT = 30000; // 30초

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // CORS credentials 설정
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 요청 로깅
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
      {
        data: config.data,
        params: config.params,
      },
    );

    // 여기에서 Authorization 헤더 추가 가능
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 로깅
    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        status: response.status,
        data: response.data,
      },
    );

    return response;
  },
  (error: AxiosError) => {
    // 에러 로깅
    console.error(
      `❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      },
    );

    // 에러 응답 처리
    const responseData = error.response?.data as
      | { error?: string; message?: string }
      | undefined;
    const apiError: ApiError = {
      message: error.message || '알 수 없는 오류가 발생했습니다.',
      statusCode: error.response?.status,
      error: responseData?.error || responseData?.message,
    };

    // 상태 코드별 에러 처리
    switch (error.response?.status) {
      case 400:
        apiError.message = '잘못된 요청입니다.';
        break;
      case 401:
        apiError.message = '인증이 필요합니다.';
        // 로그아웃 처리 또는 로그인 페이지로 리다이렉트
        break;
      case 403:
        apiError.message = '접근 권한이 없습니다.';
        break;
      case 404:
        apiError.message = '요청한 리소스를 찾을 수 없습니다.';
        break;
      case 409:
        apiError.message = '리소스 충돌이 발생했습니다.';
        break;
      case 422:
        apiError.message = '입력 데이터가 유효하지 않습니다.';
        break;
      case 500:
        apiError.message = '서버 내부 오류가 발생했습니다.';
        break;
      default:
        if (error.code === 'ECONNABORTED') {
          apiError.message = '요청 시간이 초과되었습니다.';
        } else if (error.code === 'ERR_NETWORK') {
          apiError.message = '네트워크 연결을 확인해주세요.';
        }
    }

    return Promise.reject(apiError);
  },
);

// API 클라이언트 내보내기
export default apiClient;

// 편의 메서드들
export const api = {
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.get(url, config),

  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.post(url, data, config),

  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.put(url, data, config),

  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.delete(url, config),

  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.patch(url, data, config),
};

// 베이스 URL과 타임아웃 설정을 외부에서 변경할 수 있도록 함수 제공
export const updateApiConfig = (config: {
  baseURL?: string;
  timeout?: number;
}) => {
  if (config.baseURL) {
    apiClient.defaults.baseURL = config.baseURL;
  }
  if (config.timeout) {
    apiClient.defaults.timeout = config.timeout;
  }
};
