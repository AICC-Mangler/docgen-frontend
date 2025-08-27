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
  private static readonly BASE_PATH = '/document';

  /**
   * 모든 문서 조회
   * @returns Promise<Document[]>
   */
  static async getAllDocuments(): Promise<Document[]> {
    try {
      const response = await api.get<DocumentListResponse>(this.BASE_PATH);

      if (!response.data.success) {
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
   * @param id - 문서 ID
   * @returns Promise<Document>
   */
  static async getDocumentById(id: number): Promise<Document> {
    try {
      const response = await api.get<DocumentSingleResponse>(
        `${this.BASE_PATH}/${id}`,
      );

      if (!response.data.success) {
        throw new Error(response.data.message || '문서 조회에 실패했습니다.');
      }

      if (!response.data.data) {
        throw new Error('문서 데이터를 찾을 수 없습니다.');
      }

      return response.data.data;
    } catch (error) {
      console.error(`문서(ID: ${id}) 조회 오류:`, error);
      throw error;
    }
  }

  /**
   * 새 문서 생성
   * @param documentData - 생성할 문서 데이터
   * @returns Promise<Document>
   */
  static async createDocument(
    documentData: CreateDocumentDto,
  ): Promise<Document> {
    try {
      // 입력 데이터 검증
      this.validateCreateDocumentData(documentData);

      const response = await api.post<DocumentSingleResponse>(
        this.BASE_PATH,
        documentData,
      );

      if (!response.data.success) {
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
   * @param id - 문서 ID
   * @param documentData - 수정할 문서 데이터
   * @returns Promise<Document>
   */
  static async updateDocument(
    id: number,
    documentData: UpdateDocumentDto,
  ): Promise<Document> {
    try {
      // 입력 데이터 검증
      this.validateUpdateDocumentData(documentData);

      const response = await api.put<DocumentSingleResponse>(
        `${this.BASE_PATH}/${id}`,
        documentData,
      );

      if (!response.data.success) {
        throw new Error(response.data.message || '문서 수정에 실패했습니다.');
      }

      if (!response.data.data) {
        throw new Error('문서 수정 후 데이터를 받을 수 없습니다.');
      }

      return response.data.data;
    } catch (error) {
      console.error(`문서(ID: ${id}) 수정 오류:`, error);
      throw error;
    }
  }

  /**
   * 문서 삭제
   * @param id - 문서 ID
   * @returns Promise<boolean>
   */
  static async deleteDocument(id: number): Promise<boolean> {
    try {
      const response = await api.delete<DocumentDeleteResponse>(
        `${this.BASE_PATH}/${id}`,
      );

      if (!response.data.success) {
        throw new Error(response.data.message || '문서 삭제에 실패했습니다.');
      }

      return true;
    } catch (error) {
      console.error(`문서(ID: ${id}) 삭제 오류:`, error);
      throw error;
    }
  }

  /**
   * 문서 생성 데이터 검증
   * @param data - 검증할 데이터
   */
  private static validateCreateDocumentData(data: CreateDocumentDto): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('이름은 필수 입력 항목입니다.');
    }

    if (data.name.length > 10) {
      throw new Error('이름은 10자 이하로 입력해주세요.');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('유효한 이메일 주소를 입력해주세요.');
    }

    if (data.email.length > 50) {
      throw new Error('이메일은 50자 이하로 입력해주세요.');
    }

    if (!data.password || data.password.length < 6) {
      throw new Error('비밀번호는 6자 이상 입력해주세요.');
    }

    if (data.password.length > 255) {
      throw new Error('비밀번호는 255자 이하로 입력해주세요.');
    }

    if (!data.role) {
      throw new Error('역할을 선택해주세요.');
    }
  }

  /**
   * 문서 수정 데이터 검증
   * @param data - 검증할 데이터
   */
  private static validateUpdateDocumentData(data: UpdateDocumentDto): void {
    if (data.name !== undefined) {
      if (data.name.trim().length === 0) {
        throw new Error('이름은 빈 값일 수 없습니다.');
      }
      if (data.name.length > 10) {
        throw new Error('이름은 10자 이하로 입력해주세요.');
      }
    }

    if (data.email !== undefined) {
      if (!this.isValidEmail(data.email)) {
        throw new Error('유효한 이메일 주소를 입력해주세요.');
      }
      if (data.email.length > 50) {
        throw new Error('이메일은 50자 이하로 입력해주세요.');
      }
    }

    if (data.password !== undefined) {
      if (data.password.length < 6) {
        throw new Error('비밀번호는 6자 이상 입력해주세요.');
      }
      if (data.password.length > 255) {
        throw new Error('비밀번호는 255자 이하로 입력해주세요.');
      }
    }
  }

  /**
   * 이메일 형식 검증
   * @param email - 검증할 이메일
   * @returns boolean
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// 편의를 위한 기본 export
export default DocumentService;
