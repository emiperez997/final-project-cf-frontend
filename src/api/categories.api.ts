import { apiClient } from ".";

export class CategoryApi {
  static async getCategories() {
    const response = await apiClient.get("/categories");
    return response.data;
  }
}
