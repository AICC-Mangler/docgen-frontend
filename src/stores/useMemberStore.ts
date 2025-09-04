import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// API 기본 URL 설정
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_DEV_URL ||
  import.meta.env.VITE_BACKEND_LOCAL_URL ||
  'http://localhost:3100';

// 백엔드 API 응답 타입
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// Member 타입 (백엔드와 일치)
interface Member {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  created_date_time: string;
  updated_date_time: string;
}

// Member 수정 DTO
interface UpdateMemberDto {
  name?: string;
  email?: string;
  role?: 'USER' | 'ADMIN';
  password?: string;
}

// // Member 삭제 요청 DTO
// interface DeleteMemberRequestDto {
//   password: string;
// }

// // 프로젝트 접근 권한 DTO
// interface ProjectAccessDto {
//   projectId: number;
//   memberId: number;
//   accessLevel: 'READ' | 'WRITE' | 'ADMIN';
// }

interface MemberState {
  // 상태
  members: Member[];
  currentMember: Member | null;
  isLoading: boolean;
  error: string | null;

  // 액션
  fetchAllMembers: () => Promise<void>;
  fetchMemberById: (id: number) => Promise<void>;
  updateMember: (id: number, memberData: UpdateMemberDto) => Promise<void>;
  deleteMember: (password: string, passwordConfirm: string) => Promise<void>;
  updatePassword: (
    id: number,
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
  ) => Promise<void>;
  setCurrentMember: (member: Member | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  members: [],
  currentMember: null,
  isLoading: false,
  error: null,
};

export const useMemberStore = create<MemberState>()(
  devtools(
    (set) => ({
      ...initialState,

      // 전체 멤버 조회
      fetchAllMembers: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log('fetchAllMembers ongoing');
          const response = await fetch(`${API_BASE_URL}/member/list`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || `HTTP error! status: ${response.status}`,
            );
          }

          const result: ApiResponse<Member[]> = await response.json();
          if (result.statusCode === 200) {
            console.log('fetchAllMembers success');
            set({ members: result.data, isLoading: false });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '멤버 목록 조회에 실패했습니다.';
          console.log('errorMessage = ' + errorMessage);
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 단일 멤버 조회
      fetchMemberById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/member/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || `HTTP error! status: ${response.status}`,
            );
          }

          const result: ApiResponse<Member> = await response.json();
          if (result.statusCode === 200) {
            set({ currentMember: result.data, isLoading: false });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '멤버 조회에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
        }
      },

      // 멤버 정보 수정
      updateMember: async (id: number, memberData: UpdateMemberDto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/member/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || `HTTP error! status: ${response.status}`,
            );
          }

          const result: ApiResponse<Member> = await response.json();
          if (result.statusCode === 200) {
            set((state) => ({
              members: state.members.map((member) =>
                member.id === id ? result.data : member,
              ),
              currentMember: result.data,
              isLoading: false,
            }));
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '멤버 정보 수정에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 멤버 삭제
      deleteMember: async (password: string, passwordConfirm: string) => {
        set({ isLoading: true, error: null });
        try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await fetch(`${API_BASE_URL}/member`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ password, passwordConfirm }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || `HTTP error! status: ${response.status}`,
            );
          }

          const result: ApiResponse<null> = await response.json();
          if (result.statusCode === 200) {
            set({ isLoading: false });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '멤버 삭제에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 비밀번호 변경
      updatePassword: async (
        id: number,
        currentPassword: string,
        newPassword: string,
        newPasswordConfirm: string,
      ) => {
        console.log(id);
        set({ isLoading: true, error: null });
        try {
          const accessToken = localStorage.getItem('accessToken');

          const response = await fetch(
            `${API_BASE_URL}/member/password/update`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                currentPassword,
                newPassword,
                newPasswordConfirm,
              }),
            },
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || `HTTP error! status: ${response.status}`,
            );
          }

          const result: ApiResponse<any> = await response.json();
          if (result.statusCode === 200) {
            set({ isLoading: false });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '비밀번호 변경에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 현재 멤버 설정
      setCurrentMember: (member: Member | null) => {
        set({ currentMember: member });
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
      name: 'member-store',
    },
  ),
);
