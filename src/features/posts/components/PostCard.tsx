import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Post } from "../types";
import { NavLink } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { useAppStore } from "../../../store/useAppStore";

export function PostCard({ post }: { post: Partial<Post> }) {
  const { user } = useAppStore((state) => state);

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <CardHeader
        title={post.title}
        subheader={post.createdAt}
        action={
          user?.email === post.author?.email ? (
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          ) : null
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          component={NavLink}
          to={`/posts/${post.id}`}
          color="primary"
          variant="contained"
          size="small"
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}
