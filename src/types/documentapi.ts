// API 응답 관련 타입 정의

// Document 기본 타입 (ERD 기반)
export interface Document {
  documentId: number;
  title: string;
  fileId?: number;
  filePath?: string;
  projectId: number;
  type?: string;
  created_date_time: string;
  updated_date_time: string;
  deleted_date_time?: string;
}

// Document 생성 DTO
export interface CreateDocumentDto {
  title: string;
  type?: string;
  projectId: number;
}

// Document 수정 DTO
export interface UpdateDocumentDto {
  title?: string;
  type?: string;
}

// API 응답 기본 구조 (API 문서 기반)
export interface ApiResponse<T = unknown> {
  ok: boolean;
  message?: string;
  data?: T;
  error?: any;
}

// Document 목록 응답
export interface DocumentListResponse extends ApiResponse<Document[]> {}

// Document 단일 응답
export interface DocumentSingleResponse extends ApiResponse<Document> {}

// Document 삭제 응답
export interface DocumentDeleteResponse extends ApiResponse<boolean> {}

// HTTP 메서드 타입
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API 에러 타입
export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}
