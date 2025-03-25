import { Container } from "@mui/material";
import { Title } from "../../../components/common/Title";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <>
      <Title title="Registro" />

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
          src="/cody_auth.png"
          alt="Cody Notebook"
        />

        <RegisterForm />
      </Container>
    </>
  );
}
