import {
  Button,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { formStyle } from "../../../theme/constants";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { UserApi } from "../../../api/users.api";
import { User } from "../../users/types";
import { AxiosError } from "axios";

interface RegisterFormInputs {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (
    data: RegisterFormInputs
  ) => {
    if (data.username.trim() === "") {
      toast.error("El campo nombre de usuario es requerido");
      return;
    }

    if (data.email.trim() === "") {
      toast.error("El campo email es requerido");
      return;
    }

    if (data.firstName.trim() === "") {
      toast.error("El campo nombre es requerido");
      return;
    }

    if (data.lastName.trim() === "") {
      toast.error("El campo apellido es requerido");
      return;
    }

    if (data.password.trim() === "") {
      toast.error("El campo contraseña es requerido");
      return;
    }

    if (data.confirmPassword.trim() === "") {
      toast.error("El campo confirmar contraseña es requerido");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const user: User = {
      username: data.username.trim(),
      email: data.email.trim(),
      fullName: `${data.firstName.trim()} ${data.lastName.trim()}`,
      password: data.password.trim(),
    };

    try {
      const response = await UserApi.register(user);

      if (response.status === 201) {
        toast.success("Usuario registrado correctamente");
      } else {
        toast.error("Error al registrar usuario");
      }
    } catch (error: AxiosError | any) {
      if (error.status === 409) {
        toast.error("El usuario ya existe");
        return;
      }

      toast.error("Error al registrar usuario");
    }
  };

  useEffect(() => {
    console.log(errors);

    if (errors) {
      if (errors.username) {
        toast.error("El campo nombre es requerido");
      }

      if (errors.email) {
        toast.error("El campo email es requerido");
      }

      if (errors.firstName) {
        toast.error("El campo nombre es requerido");
      }

      if (errors.lastName) {
        toast.error("El campo apellido es requerido");
      }

      if (errors.password) {
        toast.error("El campo contraseña es requerido");
      }

      if (errors.confirmPassword) {
        toast.error("El campo confirmar contraseña es requerido");
      }
    }
  }, [errors]);

  return (
    <Container maxWidth="sm">
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 5 }}
      >
        <TextField
          {...register("username", { required: true })}
          type="text"
          label="Nombre de Usuario"
          variant={formStyle}
        />

        <TextField
          {...register("firstName", { required: true })}
          type="text"
          label="Nombre"
          variant={formStyle}
        />

        <TextField
          {...register("lastName", { required: true })}
          type="text"
          label="Apellido"
          variant={formStyle}
        />

        <TextField
          {...register("email", { required: true })}
          type="email"
          label="Email"
          variant={formStyle}
        />
        <TextField
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 20,
          })}
          type="password"
          label="Contraseña"
          variant={formStyle}
        />

        <TextField
          {...register("confirmPassword", {
            required: true,
            minLength: 6,
            maxLength: 20,
          })}
          type="password"
          label="Confirmar Contraseña"
          variant={formStyle}
        />

        <Button type="submit" variant="contained">
          Registrarse
        </Button>

        <Divider />

        <Typography>
          ¿Ya tienes cuenta?{" "}
          <Button variant="text" component={NavLink} to="/login">
            Inicia Sesión
          </Button>
        </Typography>
      </Card>
    </Container>
  );
}
