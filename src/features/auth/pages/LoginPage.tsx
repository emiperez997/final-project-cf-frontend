import { Container } from "@mui/material";
import { Title } from "../../../components/common/Title";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <>
      <Title title="Inicio de Sesión" />

      <Container
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            lg: "row",
          },
          alignItems: "center",
          gap: 2,
        }}
      >
        <img
          style={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
          }}
          src="/src/assets/cody_auth.png"
          alt="Cody Notebook"
        />

        <LoginForm />
      </Container>
    </>
  );
}
