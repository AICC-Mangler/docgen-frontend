import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// API 기본 URL 설정
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_DEV_URL ||
  import.meta.env.VITE_BACKEND_LOCAL_URL ||
  'http://localhost:3100';

// 백엔드 API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

// Notice 타입 (백엔드와 일치)
interface Notice {
  id: number;
  title: string;
  content: string;
  noticetype: 'NOMAL' | 'EVENT';
  post_date: string;
  deleted_date_time?: string;
  created_date_time: string;
  updated_date_time?: string;
}

// Notice 생성 DTO
interface CreateNoticeDto {
  title: string;
  content: string;
  noticetype: 'NOMAL' | 'EVENT';
  post_date: string;
  member_id: number;
}

// Notice 수정 DTO
interface UpdateNoticeDto {
  title?: string;
  content?: string;
  noticetype?: 'NOMAL' | 'EVENT';
  post_date?: string;
}

interface NoticeState {
  // 상태
  notices: Notice[];
  currentNotice: Notice | null;
  isLoading: boolean;
  error: string | null;

  // 페이지네이션 상태
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;

  // 액션
  fetchNoticesAll: (page?: number, limit?: number) => Promise<void>;
  fetchNoticeById: (id: number) => Promise<void>;
  createNotice: (noticeData: CreateNoticeDto) => Promise<void>;
  updateNotice: (id: number, noticeData: UpdateNoticeDto) => Promise<void>;
  deleteNotice: (id: number) => Promise<void>;
  setCurrentNotice: (notice: Notice | null) => void;
  setCurrentPage: (page: number) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  notices: [],
  currentNotice: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  pageSize: 10,
};

export const useNoticeStore = create<NoticeState>()(
  devtools(
    (set) => ({
      ...initialState,

      // 공지사항 목록 조회 (페이지네이션)
      fetchNoticesAll: async (page: number = 1, limit: number = 10) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `${API_BASE_URL}/notices?page=${page}&limit=${limit}`,
            {
              mode: 'cors',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Notice[]> = await response.json();
          if (result.success) {
            // result.data가 배열인지 확인하고, 유효한 notice 객체만 필터링
            const validNotices = Array.isArray(result.data)
              ? result.data.filter((notice) => notice && notice.id)
              : [];
            set({
              notices: validNotices,
              isLoading: false,
              currentPage: result.page || page,
              totalPages: result.totalPages || 1,
              totalCount: result.total || 0,
              pageSize: result.limit || limit,
            });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '공지사항 목록 조회에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 단일 공지사항 조회
      fetchNoticeById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Notice> = await response.json();
          if (result.success) {
            set({ currentNotice: result.data, isLoading: false });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '공지사항 조회에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 공지사항 생성
      createNotice: async (noticeData: CreateNoticeDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/notices`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticeData),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Notice> = await response.json();
          if (result.success) {
            set((state) => ({
              notices: [...state.notices, result.data],
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '공지사항 생성에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 공지사항 수정
      updateNotice: async (id: number, noticeData: UpdateNoticeDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticeData),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Notice> = await response.json();
          if (result.success) {
            set((state) => ({
              notices: state.notices.map((notice) =>
                notice.id === id ? result.data : notice,
              ),
              currentNotice: result.data,
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '공지사항 수정에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 공지사항 삭제
      deleteNotice: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<{ success: boolean; message: string }> =
            await response.json();
          if (result.success) {
            set((state) => ({
              notices: state.notices.filter((notice) => notice.id !== id),
              currentNotice:
                state.currentNotice?.id === id ? null : state.currentNotice,
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '공지사항 삭제에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 현재 공지사항 설정
      setCurrentNotice: (notice: Notice | null) => {
        set({ currentNotice: notice });
      },

      // 현재 페이지 설정
      setCurrentPage: (page: number) => {
        set({ currentPage: page });
      },

      // 에러 초기화
      clearError: () => {
        set({ error: null });
      },

      // 상태 초기화
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'notice-store',
    },
  ),
);
