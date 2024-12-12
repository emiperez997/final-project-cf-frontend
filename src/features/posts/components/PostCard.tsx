import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Post } from "../types";
import { NavLink } from "react-router-dom";

export function PostCard({ post }: { post: Partial<Post> }) {
  return (
    <Card sx={{ width: 345, padding: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
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
