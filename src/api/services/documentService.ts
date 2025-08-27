import { api } from '../apiClient';
import type {
  Document,
  CreateDocumentDto,
  UpdateDocumentDto,
  DocumentListResponse,
  DocumentSingleResponse,
  DocumentDeleteResponse,
} from '../../types/documentapi';

// Document API 서비스 클래스
export class DocumentService {
  private static readonly BASE_PATH = '/documents';

  /**
   * 특정 프로젝트의 문서 목록 조회
   * @param projectId - 프로젝트 ID
   * @returns Promise<Document[]>
   */
  static async getAllDocuments(projectId: number): Promise<Document[]> {
    try {
      const response = await api.get<DocumentListResponse>(
        `/projects/${projectId}${this.BASE_PATH}`,
      );

      if (!response.data.ok) {
        throw new Error(
          response.data.message || '문서 목록 조회에 실패했습니다.',
        );
      }

      return response.data.data || [];
    } catch (error) {
      console.error('문서 목록 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 특정 문서 조회
   * @param projectId - 프로젝트 ID
   * @param documentId - 문서 ID
   * @returns Promise<Document>
   */
  static async getDocumentById(
    projectId: number,
    documentId: number,
  ): Promise<Document> {
    try {
      const response = await api.get<DocumentSingleResponse>(
        `/projects/${projectId}${this.BASE_PATH}/${documentId}`,
      );

      if (!response.data.ok) {
        throw new Error(response.data.message || '문서 조회에 실패했습니다.');
      }

      if (!response.data.data) {
        throw new Error('문서 데이터를 찾을 수 없습니다.');
      }

      return response.data.data;
    } catch (error) {
      console.error(`문서(ID: ${documentId}) 조회 오류:`, error);
      throw error;
    }
  }

  /**
   * 새 문서 생성
   * @param projectId - 프로젝트 ID
   * @param documentData - 생성할 문서 데이터
   * @returns Promise<Document>
   */
  static async createDocument(
    projectId: number,
    documentData: CreateDocumentDto,
  ): Promise<Document> {
    try {
      // 입력 데이터 검증
      this.validateCreateDocumentData(documentData);

      const response = await api.post<DocumentSingleResponse>(
        `/projects/${projectId}${this.BASE_PATH}`,
        documentData,
      );

      if (!response.data.ok) {
        throw new Error(response.data.message || '문서 생성에 실패했습니다.');
      }

      if (!response.data.data) {
        throw new Error('문서 생성 후 데이터를 받을 수 없습니다.');
      }

      return response.data.data;
    } catch (error) {
      console.error('문서 생성 오류:', error);
      throw error;
    }
  }

  /**
   * 문서 정보 수정
   * @param projectId - 프로젝트 ID
   * @param documentId - 문서 ID
   * @param documentData - 수정할 문서 데이터
   * @returns Promise<Document>
   */
  static async updateDocument(
    projectId: number,
    documentId: number,
    documentData: UpdateDocumentDto,
  ): Promise<Document> {
    try {
      // 입력 데이터 검증
      this.validateUpdateDocumentData(documentData);

      const response = await api.patch<DocumentSingleResponse>(
        `/projects/${projectId}${this.BASE_PATH}/${documentId}`,
        documentData,
      );

      if (!response.data.ok) {
        throw new Error(response.data.message || '문서 수정에 실패했습니다.');
      }

      if (!response.data.data) {
        throw new Error('문서 수정 후 데이터를 받을 수 없습니다.');
      }

      return response.data.data;
    } catch (error) {
      console.error(`문서(ID: ${documentId}) 수정 오류:`, error);
      throw error;
    }
  }

  /**
   * 문서 삭제
   * @param projectId - 프로젝트 ID
   * @param documentId - 문서 ID
   * @returns Promise<boolean>
   */
  static async deleteDocument(
    projectId: number,
    documentId: number,
  ): Promise<boolean> {
    try {
      const response = await api.delete<DocumentDeleteResponse>(
        `/projects/${projectId}${this.BASE_PATH}/${documentId}`,
      );

      if (!response.data.ok) {
        throw new Error(response.data.message || '문서 삭제에 실패했습니다.');
      }

      return true;
    } catch (error) {
      console.error(`문서(ID: ${documentId}) 삭제 오류:`, error);
      throw error;
    }
  }

  /**
   * 문서 생성 데이터 검증
   * @param data - 검증할 데이터
   */
  private static validateCreateDocumentData(data: CreateDocumentDto): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('문서 제목은 필수 입력 항목입니다.');
    }

    if (data.title.length > 25) {
      throw new Error('문서 제목은 25자 이하로 입력해주세요.');
    }

    if (data.type && data.type.trim().length > 0) {
      // 문서 타입이 선택적이지만 입력된 경우 검증
      if (data.type.length > 50) {
        throw new Error('문서 타입은 50자 이하로 입력해주세요.');
      }
    }
  }

  /**
   * 문서 수정 데이터 검증
   * @param data - 검증할 데이터
   */
  private static validateUpdateDocumentData(data: UpdateDocumentDto): void {
    if (data.title !== undefined) {
      if (data.title.trim().length === 0) {
        throw new Error('문서 제목은 빈 값일 수 없습니다.');
      }
      if (data.title.length > 25) {
        throw new Error('문서 제목은 25자 이하로 입력해주세요.');
      }
    }

    if (data.type !== undefined && data.type.trim().length > 0) {
      if (data.type.length > 50) {
        throw new Error('문서 타입은 50자 이하로 입력해주세요.');
      }
    }
  }
}

// 편의를 위한 기본 export
export default DocumentService;
