import { create } from 'zustand';

interface ModalState {
  isSignUpModalOpen: boolean;
  isLoginModalOpen: boolean;
  isMyPagePasswordModalOpen: boolean;
  isWithdrawModalOpen: boolean;
  isPasswordVerified: boolean;
  signUpStep: 'agreement' | 'form';
  withdrawCompleteCallback?: () => void;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openMyPagePasswordModal: () => void;
  closeMyPagePasswordModal: () => void;
  setPasswordVerified: (verified: boolean) => void;
  openWithdrawModal: (callback?: () => void) => void;
  closeWithdrawModal: () => void;
  nextSignUpStep: () => void;
  prevSignUpStep: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isSignUpModalOpen: false,
  isLoginModalOpen: false,
  isMyPagePasswordModalOpen: false,
  isWithdrawModalOpen: false,
  isPasswordVerified: false,
  signUpStep: 'agreement',
  openSignUpModal: () =>
    set({ isSignUpModalOpen: true, signUpStep: 'agreement' }),
  closeSignUpModal: () =>
    set({ isSignUpModalOpen: false, signUpStep: 'agreement' }),
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  openMyPagePasswordModal: () => set({ isMyPagePasswordModalOpen: true }),
  closeMyPagePasswordModal: () => set({ isMyPagePasswordModalOpen: false }),
  setPasswordVerified: (verified: boolean) =>
    set({ isPasswordVerified: verified }),
  openWithdrawModal: (callback?: () => void) =>
    set({
      isWithdrawModalOpen: true,
      withdrawCompleteCallback: callback,
    }),
  closeWithdrawModal: () =>
    set({
      isWithdrawModalOpen: false,
      withdrawCompleteCallback: undefined,
    }),
  nextSignUpStep: () => set({ signUpStep: 'form' }),
  prevSignUpStep: () => set({ signUpStep: 'agreement' }),
}));
