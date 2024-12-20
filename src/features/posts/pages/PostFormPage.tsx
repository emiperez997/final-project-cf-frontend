import { Box } from "@mui/material";
import { Title } from "../../../components/common/Title";
import { PostForm } from "../components/PostForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../types";
import { PostApi } from "../../../api/posts.api";

export function PostCreatePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box
      justifyContent="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Title title={id ? "Editar publicación" : "Crear publicación"} />

      {id ? <PostForm postId={id} /> : <PostForm />}
    </Box>
  );
}
