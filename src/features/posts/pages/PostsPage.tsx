import { useEffect, useState } from "react";
import { Title } from "../../../components/common/Title";
import { PostApi } from "../../../api/posts.api";
import { Post } from "../types";
import { PostList } from "../components/PostList";
import { Box, Skeleton } from "@mui/material";

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

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          width: 600,
        }}
      >
        <Skeleton variant="rectangular" width={200} height={80} />
        <Skeleton variant="rectangular" width={600} height={120} />
        <Skeleton variant="rectangular" width={600} height={120} />
        <Skeleton variant="rectangular" width={600} height={120} />
      </Box>
    );
  }

  if (error) return <p>Error</p>;

  return (
    <>
      <Title title="Posts" />

      <PostList posts={posts} />
    </>
  );
}
