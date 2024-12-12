export interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  categories: Category[];
  author: Author;
  createdAt?: string;
}

export interface PostCreate {
  title: string;
  content: string;
  description: string;
  categories: string[];
}

export interface Category {
  category: {
    name: string;
  };
}

export interface Author {
  full_name: string;
  email: string;
}
