/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { profileRequest, registerRequest } from "../api/auth";
import { createUser } from "../interface/user";

export interface Profile {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

type State = {
  token: string;
  profile?: Profile;
  isAuth: boolean;
  errors: any;
};

type Actions = {
  setToken: (token: string) => void;
  register: (user: createUser) => void;
  setProfile: (profile: Profile) => void;
  getProfile: () => void;
  logout: () => void;
  cleanErrors: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: {
        _id: "",
        email: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      isAuth: false,
      errors: null,
      setToken: (token: string) =>
        set((state) => ({
          ...state,
          token,
          isAuth: !!token,
        })),
      register: async (user: createUser) => {
        try {
          const resRegister = await registerRequest(user);
          set((state) => ({
            ...state,
            token: resRegister.data.token,
            isAuth: true,
          }));
        } catch (error: any) {
          set((state) => ({ ...state, errors: error.response.data }));
        }
      },
      setProfile: (profile: Profile) => set((state) => ({ ...state, profile })),
      getProfile: async () => {
        const resProfile = await profileRequest();
        set((state) => ({
          ...state,
          profile: resProfile.data,
        }));
      },
      logout: () =>
        set(() => ({ token: "", profile: undefined, isAuth: false })),
      cleanErrors: () => set((state) => ({ ...state, errors: null })),
    }),
    {
      name: "auth",
    }
  )
);
