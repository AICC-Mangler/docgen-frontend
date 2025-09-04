import { useState, useCallback } from 'react';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastItem = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      return addToast({ message, type: 'success', duration });
    },
    [addToast],
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      return addToast({ message, type: 'error', duration });
    },
    [addToast],
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      return addToast({ message, type: 'info', duration });
    },
    [addToast],
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      return addToast({ message, type: 'warning', duration });
    },
    [addToast],
  );

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    clearAll,
  };
};
