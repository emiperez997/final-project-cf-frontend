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

  static async createPost({ post }: { post: PostCreate }) {}
}
