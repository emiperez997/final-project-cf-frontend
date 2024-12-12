import { Container } from "@mui/material";
import { Navbar } from "../common/Navbar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <Container maxWidth="lg">
      <Navbar />

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mt: 10,
          py: 5,
        }}
      >
        <Outlet />
      </Container>

      {/* <Footer /> */}
    </Container>
  );
}
