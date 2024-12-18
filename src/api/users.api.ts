import { User } from "../features/users/types";
import { apiClient } from "./index";

export class UserApi {
  static async login(email: string, password: string) {
    const response = await apiClient.post("/users/login", { email, password });
    return response.data;
  }

  static async register(user: User) {
    return apiClient.post("/users/register", user);
  }

  static async getUser(id: string) {
    return apiClient.get(`/users/${id}`);
  }

  static async getUsers() {
    return apiClient.get("/users");
  }

  static async deleteUser(id: string) {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await apiClient.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  static async updateUser(id: string, user: User) {
    return apiClient.put(`/users/${id}`, user);
  }
}
