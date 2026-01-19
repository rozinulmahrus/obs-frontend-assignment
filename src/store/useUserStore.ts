// import { create } from "zustand";
// import { User } from "../models/User";
// import { fetchUsers } from "../api/userApi";

// interface UserState {
//   users: User[];
//   loading: boolean;
//   fetchUsers: () => Promise<void>;
//   addUser: (user: User) => void;
//   updateUser: (user: User) => void;
//   deleteUser: (id: number) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   users: [],
//   loading: false,

//   fetchUsers: async () => {
//     set({ loading: true });
//     const data = await fetchUsers();
//     set({ users: data, loading: false });
//   },

//   addUser: (user) => set((state) => ({ users: [...state.users, user] })),
//   updateUser: (user) =>
//     set((state) => ({
//       users: state.users.map((u) => (u.id === user.id ? user : u)),
//     })),
//   deleteUser: (id) =>
//     set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
// }));

// import { create } from "zustand";
// import { User } from "../models/User";
// import { fetchUsers } from "../api/userApi";

// interface UserState {
//   users: User[];
//   loading: boolean;
//   fetchUsers: () => Promise<void>;
//   addUser: (user: User) => void;
//   updateUser: (user: User) => void;
//   deleteUser: (id: number) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   users: [],
//   loading: false,

//   fetchUsers: async () => {
//     set({ loading: true });
//     const data = await fetchUsers();
//     set({ users: data, loading: false });
//   },

//   addUser: (user) => set((state) => ({ users: [...state.users, user] })),

//   updateUser: (user) =>
//     set((state) => ({
//       users: state.users.map((u) => (u.id === user.id ? user : u)),
//     })),

//   deleteUser: (id) =>
//     set((state) => ({
//       users: state.users.filter((u) => u.id !== id),
//     })),
// }));

// import { create } from "zustand";
// import { User } from "../models/User";
// import {
//   fetchUsers,
//   addUserApi,
//   updateUserApi,
//   deleteUserApi,
// } from "../api/userApi";

// interface UserState {
//   users: User[];
//   loading: boolean;
//   fetchUsers: () => Promise<void>;
//   addUser: (user: Partial<User>) => Promise<void>;
//   updateUser: (user: User) => Promise<void>;
//   deleteUser: (id: number) => Promise<void>;
// }

// export const useUserStore = create<UserState>((set) => ({
//   users: [],
//   loading: false,

//   fetchUsers: async () => {
//     set({ loading: true });
//     const data = await fetchUsers();
//     set({ users: data, loading: false });
//   },

//   addUser: async (user) => {
//     const newUser = await addUserApi(user);
//     console.log("New User:", newUser);
//     set((state) => ({ users: [...state.users, newUser] }));
//   },

//   updateUser: async (user) => {
//     const updated = await updateUserApi(user);
//     set((state) => ({
//       users: state.users.map((u) => (u.id === updated.id ? updated : u)),
//     }));
//   },

//   deleteUser: async (id) => {
//     await deleteUserApi(id);
//     set((state) => ({
//       users: state.users.filter((u) => u.id !== id),
//     }));
//   },
// }));

import { create } from "zustand";
import { User } from "../models/User";
import {
  fetchUsers,
  addUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/userApi";

type SnackbarSeverity = "success" | "error";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

interface UserState {
  users: User[];
  loading: boolean;
  snackbar: SnackbarState;
  fetchUsers: () => Promise<void>;
  // addUser: (user: Partial<User>) => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  closeSnackbar: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,

  snackbar: {
    open: false,
    message: "",
    severity: "success",
  },

  closeSnackbar: () =>
    set((state) => ({
      snackbar: { ...state.snackbar, open: false },
    })),

  fetchUsers: async () => {
    try {
      set({ loading: true });
      const data = await fetchUsers();
      set({ users: data, loading: false });
    } catch {
      set({
        loading: false,
        snackbar: {
          open: true,
          severity: "error",
          message: "Failed to fetch users",
        },
      });
    }
  },

  addUser: async (user) => {
    try {
      const newUser = await addUserApi(user);
      set((state) => ({
        users: [...state.users, newUser],
        snackbar: {
          open: true,
          severity: "success",
          message: "User added successfully",
        },
      }));
    } catch {
      set({
        snackbar: {
          open: true,
          severity: "error",
          message: "Failed to add user",
        },
      });
    }
  },

  updateUser: async (user) => {
    try {
      const updated = await updateUserApi(user);
      set((state) => ({
        users: state.users.map((u) => (u.id === updated.id ? updated : u)),
        snackbar: {
          open: true,
          severity: "success",
          message: "User updated successfully",
        },
      }));
    } catch {
      set({
        snackbar: {
          open: true,
          severity: "error",
          message: "Failed to update user",
        },
      });
    }
  },

  deleteUser: async (id) => {
    try {
      await deleteUserApi(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        snackbar: {
          open: true,
          severity: "success",
          message: "User deleted successfully",
        },
      }));
    } catch {
      set({
        snackbar: {
          open: true,
          severity: "error",
          message: "Failed to delete user",
        },
      });
    }
  },
}));
