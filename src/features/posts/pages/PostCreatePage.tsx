import { Box } from "@mui/material";
import { Title } from "../../../components/common/Title";
import { PostForm } from "../components/PostForm";

export function PostCreatePage() {
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
      <Title title="Crear Post" />

      <PostForm />
    </Box>
  );
}
