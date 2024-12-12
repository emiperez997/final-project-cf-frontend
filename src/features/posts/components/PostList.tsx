import { Box } from "@mui/material";
import { Post } from "../types";
import { PostCard } from "./PostCard";

export function PostList({ posts }: { posts: Partial<Post>[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
}
