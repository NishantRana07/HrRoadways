import { create } from "zustand";
import { persist } from "zustand/middleware";

// Auth store for managing user authentication state
// This store can be used to manage user login, logout, and session state.
// It can be extended to include more user-related data as needed.

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

// Modal store for managing modal state
// This can be used to open/close modals like login, register, etc.
// It can be extended to include more modal types as needed.

export const useModalStore = create((set) => ({
  modalType: null,
  openModal: (type) => set({ modalType: type }),
  closeModal: () => set({ modalType: null }),
}));