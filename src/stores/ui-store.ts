import { create } from "zustand";

type Toast = { id: number; message: string };

type UiState = {
  toast: Toast | null;
  copiedCount: number;
  showToast: (message: string) => void;
  setCopiedCount: (count: number) => void;
};

let toastTimeout: ReturnType<typeof setTimeout> | undefined;

export const useUiStore = create<UiState>((set) => ({
  toast: null,
  copiedCount: 0,
  showToast: (message) => {
    clearTimeout(toastTimeout);
    set({ toast: { id: Date.now(), message } });
    toastTimeout = setTimeout(() => set({ toast: null }), 2200);
  },
  setCopiedCount: (copiedCount) => set({ copiedCount }),
}));
