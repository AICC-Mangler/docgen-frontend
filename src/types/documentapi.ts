// API 응답 관련 타입 정의

// Document 역할 enum
export const DocumentRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type DocumentRole = (typeof DocumentRole)[keyof typeof DocumentRole];

// Document 기본 타입
export interface Document {
  id: number;
  name: string;
  email: string;
  role: DocumentRole;
  created_date_time: string;
  updated_date_time: string;
}

// Document 생성 DTO
export interface CreateDocumentDto {
  name: string;
  email: string;
  role: DocumentRole;
  password: string;
}

// Document 수정 DTO
export interface UpdateDocumentDto {
  name?: string;
  email?: string;
  role?: DocumentRole;
  password?: string;
}

// API 응답 기본 구조
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Document 목록 응답
export interface DocumentListResponse extends ApiResponse<Document[]> {
  total: number;
}

// Document 단일 응답
export interface DocumentSingleResponse extends ApiResponse<Document> {
  data: Document;
}

// Document 삭제 응답
export interface DocumentDeleteResponse {
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
