// Project 상태 enum
export const ProjectStatus = {
  COMPLETED: 'COMPLETED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING',
} as const;

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

// Project 기본 타입
export interface Project {
  id: number;
  member_id: number;
  title: string;
  introduction: string;
  project_status: ProjectStatus;
  created_date_time: string;
  updated_date_time: string;
}

// Project 생성 DTO
export interface CreateProjectDto {
  title: string;
  introduction: string;
  project_status: ProjectStatus;
}

// Project 수정 DTO
export interface UpdateProjectDto {
  title?: string;
  introduction?: string;
  project_status?: ProjectStatus;
}

// API 응답 기본 구조
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Project 목록 응답
export interface ProjectListResponse extends ApiResponse<Project[]> {
  total: number;
}

// Project 단일 응답
export interface ProjectSingleResponse extends ApiResponse<Project> {
  data: Project;
}

// Project 삭제 응답
export interface ProjectDeleteResponse {
  success: boolean;
  message: string;
}

// HTTP 메서드 타입
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API 에러 타입
export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}
