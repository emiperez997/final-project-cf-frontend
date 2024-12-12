import {
  Button,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { formStyle } from "../../../theme/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { UserApi } from "../../../api/users.api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useState } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "../../../store/types";

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const setUser = useAppStore((state) => state.setUser);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    if (errors.email || errors.password) {
      return;
    }

    setIsLoading(true);

    try {
      const { token } = await UserApi.login(data.email, data.password);

      const decoded: UserToken = jwtDecode(token);

      setUser(decoded);
      localStorage.setItem("user", JSON.stringify(decoded));

      toast.success("Inicio de sesión exitoso");

      navigate("/", { replace: true });
    } catch (error: AxiosError | any) {
      if (error.response?.status === 401) {
        toast.error("Usuario o contraseña incorrectos");
      }

      console.log(error);

      toast.error("Ocurrió un error inesperado");

      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
      >
        <TextField
          {...register("email")}
          type="email"
          label="Email"
          variant={formStyle}
        />
        <TextField
          {...register("password")}
          type="password"
          label="Contraseña"
          variant={formStyle}
        />

        <LoadingButton type="submit" variant="contained" loading={isLoading}>
          Iniciar Sesión
        </LoadingButton>

        <Divider />

        <Typography>
          ¿No tienes cuenta?{" "}
          <Button variant="text" component={NavLink} to="/register">
            Registrate
          </Button>
        </Typography>
      </Card>
    </Container>
  );
}
