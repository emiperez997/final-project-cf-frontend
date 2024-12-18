import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { User } from "../../users/types";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { UserApi } from "../../../api/users.api";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog";

export default function UserTable({ users }: { users: User[] }) {
  const [open, setOpen] = useState<boolean>(false);

  const [id, setId] = useState<string>("");

  const handleOpen = (id: string) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = async (newValue: boolean) => {
    setOpen(false);

    if (newValue) {
      await handleDelete();
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await UserApi.deleteUser(id);
        toast.success("Usuario eliminado correctamente");
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  const headers = [
    { id: "id", label: "#" },
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
    { id: "full_name", label: "Nombre completo" },
    { id: "role", label: "Rol" },
    { id: "actions", label: "Acciones" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <ConfirmDialog
        message="¿Seguro deseas eliminar al usuario?"
        title="Eliminar usuario"
        open={open}
        onClose={handleClose}
      />

      <TableContainer
        sx={{
          width: {
            xs: "50%",
            sm: "80%",
            md: "100%",
          },
          alignSelf: "center",
        }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.id}>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1} flexWrap={"wrap"}>
                    <Button variant="contained" color="secondary">
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpen(user.id!)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
