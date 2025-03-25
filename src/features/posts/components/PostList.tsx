import { Box } from "@mui/material";
import { Post } from "../types";
import { PostCard } from "./PostCard";

export function PostList({ posts }: { posts: Partial<Post>[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        width: {
          sm: 600,
          md: 800,
        },
      }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
}
