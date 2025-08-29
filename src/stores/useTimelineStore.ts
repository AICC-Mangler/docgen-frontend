import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// API 기본 URL 설정 (직접 백엔드 호출)
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_DEV_URL ||
  import.meta.env.VITE_BACKEND_LOCAL_URL ||
  'http://localhost:3100';

// 백엔드 API 응답 타입 (간단하게 정의)
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Timeline 타입 (백엔드와 일치)
interface Timeline {
  id: number;
  member_id: number;
  title: string;
  introduction: string;
  project_status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  created_date_time: string;
  updated_date_time: string;
}

// Timeline 생성 DTO
interface CreateTimelineDto {
  title: string;
  introduction: string;
  project_status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
}

// Timeline 수정 DTO
interface UpdateTimelineDto {
  title?: string;
  introduction?: string;
  project_status?: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
}

interface TimelineState {
  // 상태
  projects: Timeline[];
  currentTimeline: Timeline | null;
  isLoading: boolean;
  error: string | null;

  // 액션
  fetchTimelineByProjectId: (projectId: number) => Promise<void>;
  fetchTimelineById: (id: number) => Promise<void>;
  createTimeline: (projectData: CreateTimelineDto) => Promise<void>;
  updateTimeline: (id: number, projectData: UpdateTimelineDto) => Promise<void>;
  deleteTimeline: (id: number) => Promise<void>;
  setCurrentTimeline: (project: Timeline | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  projects: [],
  currentTimeline: null,
  isLoading: false,
  error: null,
};

export const useTimelineStore = create<TimelineState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // 프로젝트 목록 조회
      fetchTimelineByProjectId: async (projectId: number) => {
        set({ isLoading: true, error: null });
        try {
          console.log('useStore ongoing');
          const response = await fetch(
            `${API_BASE_URL}/timeline?id=${projectId}`,
            {
              mode: 'cors',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          if (!response.ok) {
            console.log('useStore fail');
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Timeline[]> = await response.json();
          if (result.success) {
            console.log('useStore success');
            set({ projects: result.data, isLoading: false });
          } else {
            console.log('useStore fail2');
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '프로젝트 목록 조회에 실패했습니다.';
          console.log('errorMessage = ' + errorMessage);
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 특정 프로젝트 조회
      fetchTimelineById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/projects/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Timeline> = await response.json();
          if (result.success) {
            set({ currentTimeline: result.data, isLoading: false });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '프로젝트 조회에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 프로젝트 생성
      createTimeline: async (projectData: CreateTimelineDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Timeline> = await response.json();
          if (result.success) {
            set((state) => ({
              projects: [...state.projects, result.data],
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '프로젝트 생성에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 프로젝트 수정
      updateTimeline: async (id: number, projectData: UpdateTimelineDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Timeline> = await response.json();
          if (result.success) {
            set((state) => ({
              projects: state.projects.map((project) =>
                project.id === id ? result.data : project,
              ),
              currentTimeline:
                state.currentTimeline?.id === id
                  ? result.data
                  : state.currentTimeline,
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '프로젝트 수정에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 프로젝트 삭제
      deleteTimeline: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<{ success: boolean; message: string }> =
            await response.json();
          if (result.success) {
            set((state) => ({
              projects: state.projects.filter((project) => project.id !== id),
              currentTimeline:
                state.currentTimeline?.id === id ? null : state.currentTimeline,
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '프로젝트 삭제에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 현재 프로젝트 설정
      setCurrentTimeline: (project: Timeline | null) => {
        set({ currentTimeline: project });
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
      name: 'project-store',
    },
  ),
);
