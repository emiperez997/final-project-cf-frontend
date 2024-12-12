import { Grid2, Typography } from "@mui/material";

export function Footer() {
  return (
    <Grid2 container spacing={2} justifyContent={"space-around"}>
      <Grid2 size={6} alignItems="center">
        <img
          src="/src/assets/logo-cf.png"
          alt="Logo Código Facilito"
          loading="lazy"
          height={30}
          width={30}
        />
        <Typography
          color="info"
          variant="h6"
          component="p"
          sx={{ flexGrow: 1, ml: 2 }}
        >
          Código Facilito | Blog
        </Typography>
      </Grid2>

      <Grid2 size={6}>
        <h1>Footer</h1>
      </Grid2>
    </Grid2>
  );
}
