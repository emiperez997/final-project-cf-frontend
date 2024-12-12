import { Typography } from "@mui/material";

export function Title({ title }: { title: string }) {
  return (
    <Typography variant="h2" component="h1" gutterBottom>
      {title}
    </Typography>
  );
}
