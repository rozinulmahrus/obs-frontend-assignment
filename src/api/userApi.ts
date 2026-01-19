import axios, { Axios, AxiosError } from "axios";
import { User } from "../models/User";

const BASE_URL = "https://dummyjson.com/users";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get(BASE_URL);

  return res.data.users.map((u: any) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    phone: u.phone,
    avatar: u.image,
  }));
};

export const addUserApi = async (user: Partial<User>): Promise<User> => {
  try {
    const res = await axios.post(`${BASE_URL}/add`, {
      firstName: user.name?.split(" ")[0],
      lastName: user.name?.split(" ")[1] || "",
      email: user.email,
      phone: user.phone,
    });
    return {
      id: res.data.id,
      name: `${res.data.firstName} ${res.data.lastName}`,
      email: res.data.email,
      phone: res.data.phone,
      avatar: `https://picsum.photos/seed/${res.data.id}/200`,
      snackbarMessage: "User added successfully",
    };
  } catch (error: unknown) {
    console.log("Add User Error:", (error as AxiosError).response);
    throw error;
  }
};

export const updateUserApi = async (user: User): Promise<User> => {
  try {
    const res = await axios.put(`${BASE_URL}/${user.id}`, {
      email: user.email,
      phone: user.phone,
    });

    return {
      ...user,
      email: res.data.email,
      phone: res.data.phone,
    };
  } catch (error: unknown) {
    return {
      ...user,
    };
  }
};

export const deleteUserApi = async (id: number): Promise<void> => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    console.log("Delete successful", res.data);
  } catch (error: unknown) {
    console.log("Delete failed", (error as AxiosError).response);
  }
};
