import { PostCreate } from "../features/posts/types";
import { apiClient } from "./index";

export class PostApi {
  static async getPosts() {
    const response = await apiClient.get("/posts");
    return response.data;
  }

  static async getPost({ id }: { id: string }) {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  }

  static async createPost({ post }: { post: PostCreate }) {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await apiClient.post("/posts", post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  static async updatePost({ id, post }: { id: string; post: PostCreate }) {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await apiClient.patch(`/posts/${id}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  static async deletePost({ id }: { id: string }) {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await apiClient.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
