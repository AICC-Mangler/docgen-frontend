import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { api } from '../api/apiClient';
import type { ApiError } from '../types/api';

// 백엔드 API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Project 타입 (백엔드와 일치)
interface Project {
  id: number;
  member_id: number;
  title: string;
  introduction: string;
  project_status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  created_date_time: string;
  updated_date_time: string;
  hashtags?: string[];
}

// Project 생성 DTO
interface CreateProjectDto {
  member_id: number;
  title: string;
  introduction: string;
  project_status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  hashtags?: string[];
}

// Project 수정 DTO
interface UpdateProjectDto {
  title?: string;
  introduction?: string;
  project_status?: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  hashtags?: string[];
}

interface ProjectState {
  // 상태
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;

  // 액션
  fetchProjectsByMemberId: (memberId: number) => Promise<void>;
  fetchProjectById: (id: number) => Promise<void>;
  createProject: (projectData: CreateProjectDto) => Promise<void>;
  updateProject: (id: number, projectData: UpdateProjectDto) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
};

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set) => ({
      ...initialState,

      // 프로젝트 목록 조회 (멤버별)
      fetchProjectsByMemberId: async (memberId: number) => {
        set({ isLoading: true, error: null });
        try {
          console.log('fetchProjectsByMemberId ongoing');
          const response = await api.get<ApiResponse<Project[]>>(
            `/projects/?id=${memberId}`,
          );
          const result = response.data;

          if (result.success) {
            console.log('fetchProjectsByMemberId success');
            console.log('result.data = ' + result.data[0]);
            set({ projects: result.data, isLoading: false });
          } else {
            console.log('fetchProjectsByMemberId fail2');
            throw new Error(result.message);
          }
        } catch (error) {
          const apiError = error as ApiError;
          const errorMessage =
            apiError.message || '프로젝트 목록 조회에 실패했습니다.';
          console.log('errorMessage = ' + errorMessage);
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 단일 프로젝트 조회
      fetchProjectById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get<ApiResponse<Project>>(
            `/projects/${id}`,
          );
          const result = response.data;

          if (result.success) {
            set({ currentProject: result.data, isLoading: false });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const apiError = error as ApiError;
          const errorMessage =
            apiError.message || '프로젝트 조회에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 프로젝트 생성
      createProject: async (projectData: CreateProjectDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<ApiResponse<Project>>(
            '/projects',
            projectData,
          );
          const result = response.data;

          if (result.success) {
            set((state) => ({
              projects: [...state.projects, result.data],
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const apiError = error as ApiError;
          const errorMessage =
            apiError.message || '프로젝트 생성에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 프로젝트 수정
      updateProject: async (id: number, projectData: UpdateProjectDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.put<ApiResponse<Project>>(
            `/projects/${id}`,
            projectData,
          );
          const result = response.data;

          if (result.success) {
            set((state) => ({
              projects: state.projects.map((project) =>
                project.id === id ? result.data : project,
              ),
              currentProject: result.data,
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const apiError = error as ApiError;
          const errorMessage =
            apiError.message || '프로젝트 수정에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 프로젝트 삭제
      deleteProject: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.delete<
            ApiResponse<{ success: boolean; message: string }>
          >(`/projects/${id}`);
          const result = response.data;

          if (result.success) {
            set((state) => ({
              projects: state.projects.filter((project) => project.id !== id),
              currentProject:
                state.currentProject?.id === id ? null : state.currentProject,
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const apiError = error as ApiError;
          const errorMessage =
            apiError.message || '프로젝트 삭제에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 현재 프로젝트 설정
      setCurrentProject: (project: Project | null) => {
        set({ currentProject: project });
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
