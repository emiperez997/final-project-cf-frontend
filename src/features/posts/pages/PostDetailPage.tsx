import { useEffect, useState } from "react";
import { Post } from "../types";
import { NavLink, useParams } from "react-router-dom";
import { PostApi } from "../../../api/posts.api";
import { Title } from "../../../components/common/Title";
import { Box, Button, Chip, Typography } from "@mui/material";
import { NotFoundPage } from "../../not-found/NotFound";

export function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);

      if (id) {
        try {
          const post = await PostApi.getPost({ id });
          setPost(post);
        } catch (error: any) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchPost();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!post) return <NotFoundPage message="Post no encontrado" />;

  console.log(post);

  return (
    <Box
      justifyContent="center"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title title={post.title} />

      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        {post.description}
      </Typography>

      <Typography
        maxWidth="sm"
        my={5}
        variant="body1"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        {post.content}
      </Typography>

      {post.categories && (
        <>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Categories:{" "}
            {post.categories.map(({ category }) => (
              <Chip sx={{ ml: 1 }} key={category.name} label={category.name} />
            ))}
          </Typography>
        </>
      )}

      <Button
        component={NavLink}
        to="/posts"
        variant="contained"
        color="info"
        sx={{ my: 5 }}
      >
        Volver
      </Button>
    </Box>
  );
}
