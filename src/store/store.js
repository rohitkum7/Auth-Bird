import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningup: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isUpdating: false,
  isLoading: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/users/current-user");
      set({ authUser: res.data.data });
    } catch (error) {
      console.log("Error getting current user", error.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstance.post("/users/register", data);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting current user", error.message);
      toast.error("Error signing up");
    } finally {
      set({ isSigningup: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/users/login", data);
      set({ authUser: res.data.data.user });
    } catch (error) {
      console.log("Error getting current user", error.message);
      toast.error("Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/users/logout");
      set({ authUser: null });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error Logging out", error);
      toast.error("Error logging out");
    }
  },

  forgotPassword: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/users/forgot-password", data);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in Sending Mail", error);
      toast.error("Error in Sending Mail");
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (data, resetToken) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(
        `/users/reset-password/${resetToken}`,
        data
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in resetting password", error);
      toast.error("Error in resetting password");
    } finally {
      set({ isLoading: false });
    }
  },
}));
