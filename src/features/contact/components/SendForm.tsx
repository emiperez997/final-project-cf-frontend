import { Button, Card, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function SendForm({ setSend }: { setSend: (value: boolean) => void }) {
  return (
    <Card
      sx={{
        padding: 5,
      }}
    >
      <CheckCircleIcon color="success" sx={{ fontSize: "200px" }} />

      <Typography variant="h5">¡Gracias por tu mensaje!</Typography>
      <Typography variant="body1">
        Nos pondremos en contacto contigo lo antes posible.
      </Typography>

      <Button variant="contained" sx={{ mt: 5 }} onClick={() => setSend(false)}>
        Volver al formulario
      </Button>
    </Card>
  );
}
