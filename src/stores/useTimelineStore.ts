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
  project_id: number;
  title: string;
  description: string;
  event_date: Date;
  created_date_time: string;
  updated_date_time: string;
}

// Timeline 생성 DTO
interface CreateTimelineDto {
  title: string;
  introduction: string;
  event_date: Date;
}

// Timeline 수정 DTO
interface UpdateTimelineDto {
  title?: string;
  description?: string;
  event_date?: string;
}

interface TimelineState {
  // 상태
  timelines: Timeline[];
  currentTimeline: Timeline | null;
  isLoading: boolean;
  error: string | null;

  // 액션
  fetchTimelinesByProjectId: (id: number) => Promise<void>;
  createTimeline: (projectData: CreateTimelineDto) => Promise<void>;
  updateTimeline: (id: number, projectData: UpdateTimelineDto) => Promise<void>;
  deleteTimeline: (id: number) => Promise<void>;
  setCurrentTimeline: (project: Timeline | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  timelines: [],
  currentTimeline: null,
  isLoading: false,
  error: null,
};

export const useTimelineStore = create<TimelineState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // 타임라인 목록 조회
      fetchTimelinesByProjectId: async (projectId: number) => {
        set({ isLoading: true, error: null });
        try {
          console.log('fetchTimelinesByProjectId ongoing');
          const response = await fetch(
            `${API_BASE_URL}/timelines/projects/?id=${projectId}`,
            {
              mode: 'cors',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          if (!response.ok) {
            console.log('fetchTimelinesByProjectId fail');
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Timeline[]> = await response.json();
          if (result.success) {
            console.log('fetchTimelinesByProjectId success');
            set({ timelines: result.data, isLoading: false });
          } else {
            console.log('fetchTimelinesByProjectId fail2');
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '타임라인 목록 조회에 실패했습니다.';
          console.log('errorMessage = ' + errorMessage);
          set({ error: errorMessage, isLoading: false });
        }
      },

      createTimeline: async (timelineData: CreateTimelineDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/timelines`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(timelineData),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Timeline> = await response.json();
          if (result.success) {
            set((state) => ({
              timelines: [...state.timelines, result.data],
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '타임라인 생성에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      updateTimeline: async (id: number, timelineData: UpdateTimelineDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/timelines/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(timelineData),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: ApiResponse<Timeline> = await response.json();
          if (result.success) {
            set((state) => ({
              timelines: state.timelines.map((timeline) =>
                timeline.id === id ? result.data : timeline,
              ),
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '타임라인 수정에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      deleteTimeline: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/timelines/${id}`, {
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
              timelines: state.timelines.filter(
                (timeline) => timeline.id !== id,
              ),
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '타임라인 삭제에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 현재 타임라인 설정
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
