import { useEffect, useState } from "react";
import { Post } from "../types";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PostApi } from "../../../api/posts.api";
import { Title } from "../../../components/common/Title";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { NotFoundPage } from "../../not-found/NotFound";
import { useAppStore } from "../../../store/useAppStore";
import { toast } from "react-toastify";

export interface ConfirmationDialogRawProps {
  open: boolean;
  title: string;
  message: string;
  onClose: (value: boolean) => void;
}

function ConfirmDialog(props: ConfirmationDialogRawProps) {
  const { onClose, title, message, open } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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

  if (isLoading) return <p>Loading...</p>;

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
