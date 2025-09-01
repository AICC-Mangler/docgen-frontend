import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// API 기본 URL 설정
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_DEV_URL ||
  import.meta.env.VITE_BACKEND_LOCAL_URL ||
  'http://localhost:3100';

// JWT 토큰에서 사용자 ID 추출하는 유틸리티 함수
const extractUserIdFromToken = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || payload.id || null;
  } catch (error) {
    console.error('JWT 토큰 파싱 실패:', error);
    return null;
  }
};

// 백엔드 API 응답 타입
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// 토큰 응답 타입
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// 회원가입 요청 DTO
interface SignupRequestDto {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// 로그인 요청 DTO
interface SigninRequestDto {
  email: string;
  password: string;
  keepLoggedIn?: boolean;
}

// // 비밀번호 찾기 요청 DTO
// interface PasswordFindRequestDto {
//   email: string;
// }

// // 아이디 찾기 요청 DTO
// interface IdFindRequestDto {
//   name: string;
// }

// 비밀번호 변경 요청 DTO
interface PasswordUpdateRequestDto {
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface AuthenticationState {
  // 상태
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
  } | null;
  isLoading: boolean;
  error: string | null;

  // 액션
  signup: (signupData: SignupRequestDto) => Promise<void>;
  signin: (signinData: SigninRequestDto) => Promise<void>;
  signout: () => Promise<void>;
  // findPassword: (email: string) => Promise<void>;
  // findId: (name: string) => Promise<void>;
  updatePassword: (passwordData: PasswordUpdateRequestDto) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  setUser: (user: AuthenticationState['user']) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  error: null,
};

export const useAuthenticationStore = create<AuthenticationState>()(
  devtools(
    (set, get) => {
      // 초기화 시 로컬 스토리지에서 토큰 복원
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const initialStateWithToken =
        accessToken && refreshToken
          ? {
              isAuthenticated: true,
              accessToken,
              refreshToken,
              user: null,
              isLoading: false,
              error: null,
            }
          : initialState;

      return {
        ...initialStateWithToken,

        // 회원가입
        signup: async (signupData: SignupRequestDto) => {
          set({ isLoading: true, error: null });
          try {
            console.log('signup ongoing');
            const response = await fetch(
              `${API_BASE_URL}/authentication/signup`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
              },
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.message || `HTTP error! status: ${response.status}`,
              );
            }

            const result: ApiResponse<any> = await response.json();
            if (result.statusCode === 201) {
              console.log('signup success');
              set({ isLoading: false });
            } else {
              throw new Error(result.message);
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : '회원가입에 실패했습니다.';
            console.log('errorMessage = ' + errorMessage);
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // 로그인
        signin: async (signinData: SigninRequestDto) => {
          set({ isLoading: true, error: null });
          try {
            console.log('signin ongoing');
            const response = await fetch(
              `${API_BASE_URL}/authentication/signin`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(signinData),
              },
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.message || `HTTP error! status: ${response.status}`,
              );
            }

            const result: ApiResponse<TokenResponse> = await response.json();
            console.log('백엔드 응답:', result);
            if (result.statusCode === 200) {
              console.log('signin success');
              const { accessToken, refreshToken } = result.data;

              // 토큰을 로컬 스토리지에 저장
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);

              // 로그인 상태 유지 옵션에 따라 토큰 저장 방식 결정
              if (signinData.keepLoggedIn) {
                localStorage.setItem('keepLoggedIn', 'true');
              }

              // JWT 토큰에서 사용자 ID 추출
              const userId = extractUserIdFromToken(accessToken);

              if (!userId) {
                throw new Error('토큰에서 사용자 ID를 추출할 수 없습니다.');
              }

              // 백엔드에서 실제 사용자 정보 가져오기
              try {
                const userResponse = await fetch(
                  `${API_BASE_URL}/member/${userId}`,
                  {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${accessToken}`,
                    },
                  },
                );

                if (userResponse.ok) {
                  const userResult = await userResponse.json();
                  if (userResult.statusCode === 200) {
                    const userInfo = {
                      id: userResult.data.id,
                      name: userResult.data.name,
                      email: userResult.data.email,
                      role: userResult.data.role,
                    };

                    set({
                      isAuthenticated: true,
                      accessToken,
                      refreshToken,
                      user: userInfo,
                      isLoading: false,
                    });
                  } else {
                    throw new Error(userResult.message);
                  }
                } else {
                  throw new Error('사용자 정보 조회에 실패했습니다.');
                }
              } catch (userError) {
                console.error('사용자 정보 조회 실패:', userError);
                // 사용자 정보 조회 실패 시 기본 정보로 설정
                const userInfo = {
                  id: userId,
                  name: '사용자',
                  email: signinData.email,
                  role: 'USER' as const,
                };

                set({
                  isAuthenticated: true,
                  accessToken,
                  refreshToken,
                  user: userInfo,
                  isLoading: false,
                });
              }
            } else {
              throw new Error(result.message);
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : '로그인에 실패했습니다.';
            console.log('errorMessage = ' + errorMessage);
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        // 로그아웃
        signout: async () => {
          set({ isLoading: true, error: null });
          try {
            const { accessToken } = get();

            if (accessToken) {
              // 백엔드에 로그아웃 요청 (선택사항)
              await fetch(`${API_BASE_URL}/authentication/signout`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
              }).catch(() => {
                // 로그아웃 요청이 실패해도 클라이언트에서는 로그아웃 처리
              });
            }

            // 로컬 스토리지에서 토큰 제거
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('keepLoggedIn');

            set({
              isAuthenticated: false,
              accessToken: null,
              refreshToken: null,
              user: null,
              isLoading: false,
            });
          } catch (error) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : '로그아웃에 실패했습니다.';
            set({ error: errorMessage, isLoading: false });
          }
        },

        // // 비밀번호 찾기
        // findPassword: async (email: string) => {
        //   set({ isLoading: true, error: null });
        //   try {
        //     const response = await fetch(
        //       `${API_BASE_URL}/authentication/password-find`,
        //       {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email }),
        //       },
        //     );

        //     if (!response.ok) {
        //       const errorData = await response.json();
        //       throw new Error(
        //         errorData.message || `HTTP error! status: ${response.status}`,
        //       );
        //     }

        //     const result: ApiResponse<any> = await response.json();
        //     if (result.statusCode === 200) {
        //       set({ isLoading: false });
        //     } else {
        //       throw new Error(result.message);
        //     }
        //   } catch (error) {
        //     const errorMessage =
        //       error instanceof Error
        //         ? error.message
        //         : '비밀번호 찾기에 실패했습니다.';
        //     set({ error: errorMessage, isLoading: false });
        //     throw error;
        //   }
        // },

        // // 아이디 찾기
        // findId: async (name: string) => {
        //   set({ isLoading: true, error: null });
        //   try {
        //     const response = await fetch(
        //       `${API_BASE_URL}/authentication/id-find`,
        //       {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ name }),
        //       },
        //     );

        //     if (!response.ok) {
        //       const errorData = await response.json();
        //       throw new Error(
        //         errorData.message || `HTTP error! status: ${response.status}`,
        //       );
        //     }

        //     const result: ApiResponse<any> = await response.json();
        //     if (result.statusCode === 200) {
        //       set({ isLoading: false });
        //     } else {
        //       throw new Error(result.message);
        //     }
        //   } catch (error) {
        //     const errorMessage =
        //       error instanceof Error
        //         ? error.message
        //         : '아이디 찾기에 실패했습니다.';
        //     set({ error: errorMessage, isLoading: false });
        //     throw error;
        //   }
        // },

        // 비밀번호 변경
        updatePassword: async (passwordData: PasswordUpdateRequestDto) => {
          set({ isLoading: true, error: null });
          try {
            const { accessToken } = get();

            const response = await fetch(
              `${API_BASE_URL}/authentication/password-update`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(passwordData),
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

        // 액세스 토큰 갱신
        refreshAccessToken: async () => {
          const { refreshToken } = get();

          if (!refreshToken) {
            throw new Error('리프레시 토큰이 없습니다.');
          }

          try {
            const response = await fetch(
              `${API_BASE_URL}/authentication/refresh`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
              },
            );

            if (!response.ok) {
              throw new Error('토큰 갱신에 실패했습니다.');
            }

            const result: ApiResponse<TokenResponse> = await response.json();
            if (result.statusCode === 200) {
              const { accessToken, refreshToken: newRefreshToken } =
                result.data;

              // 새로운 토큰 저장
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', newRefreshToken);

              set({
                accessToken,
                refreshToken: newRefreshToken,
              });
            } else {
              throw new Error(result.message);
            }
          } catch (error) {
            // 토큰 갱신 실패 시 로그아웃 처리
            get().signout();
            throw error;
          }
        },

        // 사용자 정보 설정
        setUser: (user: AuthenticationState['user']) => {
          set({ user });
        },

        // 에러 초기화
        clearError: () => {
          set({ error: null });
        },

        // 상태 초기화
        reset: () => {
          set(initialState);
        },
      };
    },
    {
      name: 'authentication-store',
    },
  ),
);
