import { useEffect, useState } from "react";
import { Post } from "../types";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PostApi } from "../../../api/posts.api";
import { Title } from "../../../components/common/Title";
import { Box, Button, Chip, Skeleton, Typography } from "@mui/material";
import { NotFoundPage } from "../../not-found/NotFound";
import { useAppStore } from "../../../store/useAppStore";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog";

export function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isAuth = useAppStore((state) => state.isAuth);
  const user = useAppStore((state) => state.user);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async (newValue: boolean) => {
    setOpen(false);

    if (newValue) {
      await handleDelete();
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await PostApi.deletePost({ id });
        toast.success("Post eliminado correctamente");

        navigate("/", { replace: true });
      } catch (error: any) {
        console.error(error);
      }
    }
  };

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

        <Skeleton variant="rectangular" width={280} height={30} />

        <Skeleton variant="rectangular" width={120} height={30} />

        <Skeleton variant="rectangular" width="100%" height={130} />
      </Box>
    );
  }

  if (!post) return <NotFoundPage message="Post no encontrado" />;

  return (
    <Box
      justifyContent="center"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ConfirmDialog
        open={open}
        onClose={handleClose}
        title="Eliminar post"
        message="¿Estás seguro de eliminar este post?"
      />

      <Title title={post.title} />

      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        {post.description}
      </Typography>

      <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
        {post.author.full_name}
      </Typography>

      {isAuth && user?.email === post.author.email && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Button
            component={NavLink}
            to={`/posts/${post.id}/edit`}
            variant="contained"
            color="secondary"
          >
            Editar
          </Button>

          <Button onClick={handleOpen} variant="contained" color="error">
            Eliminar
          </Button>
        </Box>
      )}

      <Typography
        maxWidth="sm"
        my={5}
        variant="body1"
        sx={{ color: "text.secondary", textAlign: "left" }}
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
