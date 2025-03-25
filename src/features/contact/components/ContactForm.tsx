import { Button, Card, Container, TextField, Typography } from "@mui/material";
import { formStyle } from "../../../theme/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface ContactInputs {
  name: string;
  email: string;
  message: string;
}

export function ContactForm({
  setSend,
}: {
  setSend: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInputs>();

  const onSubmit: SubmitHandler<ContactInputs> = (data: ContactInputs) => {
    if (data.name.trim() === "") {
      toast.error("El campo nombre es requerido");
      return;
    }

    if (data.email.trim() === "") {
      toast.error("El campo email es requerido");
      return;
    }

    if (data.message.trim() === "") {
      toast.error("El campo mensaje es requerido");
      return;
    }

    setSend(true);
  };

  useEffect(() => {
    if (errors) {
      if (errors.name) {
        toast.error("El campo nombre es requerido");
      }

      if (errors.email) {
        toast.error("El campo email es requerido");
      }

      if (errors.message) {
        toast.error("El campo mensaje es requerido");
      }
    }
  }, [errors]);

  return (
    <Container
      maxWidth="sm"
      sx={{ gap: 5, display: "flex", flexDirection: "column" }}
    >
      <img src="/cody_contacto.png" alt="Cody Contacto" />

      <Typography maxWidth="sm" variant="subtitle1" color="primary">
        Para nosotros es importante conocer tus dudas, comentarios o
        sugerencias. Por favor, completa el siguiente formulario para ponerte en
        contacto con nosotros.
      </Typography>

      <Card
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 5 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("name", { required: true })}
          label="Nombre"
          variant={formStyle}
        />
        <TextField
          {...register("email", { required: true })}
          label="Email"
          variant={formStyle}
        />
        <TextField
          {...register("message", { required: true })}
          label="Mensaje"
          variant={formStyle}
          rows={4}
          multiline
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "100%" }}
          type="submit"
        >
          Enviar
        </Button>
      </Card>
    </Container>
  );
}
