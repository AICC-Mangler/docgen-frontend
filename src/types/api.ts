// API 응답 관련 타입 정의

// Member 역할 enum
export const MemberRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];

// Member 기본 타입
export interface Member {
  id: number;
  name: string;
  email: string;
  role: MemberRole;
  created_date_time: string;
  updated_date_time: string;
}

// Member 생성 DTO
export interface CreateMemberDto {
  name: string;
  email: string;
  role: MemberRole;
  password: string;
}

// Member 수정 DTO
export interface UpdateMemberDto {
  name?: string;
  email?: string;
  role?: MemberRole;
  password?: string;
}

// API 응답 기본 구조
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Member 목록 응답
export interface MemberListResponse extends ApiResponse<Member[]> {
  total: number;
}

// Member 단일 응답
export interface MemberSingleResponse extends ApiResponse<Member> {
  data: Member;
}

// Member 삭제 응답
export interface MemberDeleteResponse {
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
