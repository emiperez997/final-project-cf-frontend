import { useEffect, useState } from "react";
import { Title } from "../../../components/common/Title";
import { PostApi } from "../../../api/posts.api";
import { Post } from "../types";
import { PostList } from "../components/PostList";

export function PostsPage() {
  const [posts, setPosts] = useState<Partial<Post>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const posts = await PostApi.getPosts();
        setPosts(posts);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <>
      <Title title="Posts" />

      <PostList posts={posts} />
    </>
  );
}
