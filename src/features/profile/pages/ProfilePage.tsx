import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Title } from "../../../components/common/Title";
import { useAppStore } from "../../../store/useAppStore";
import { useEffect, useState } from "react";
import { UserApi } from "../../../api/users.api";
import { PostList } from "../../posts/components/PostList";
import { NavLink } from "react-router-dom";

export function ProfilePage() {
  const userState = useAppStore((state) => state.user);
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        if (!userState) {
          return;
        }

        const profile = await UserApi.getUser(userState.id);

        setUser(profile.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Box
        justifyContent="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Title title="Perfil" />

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            padding: 2,
            width: "100%",
            maxWidth: 500,
            textAlign: "start",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Nombre: {user?.full_name}
              </Typography>

              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Email: {user?.email}
              </Typography>

              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Nombre de usuario: {user?.username}
              </Typography>
            </CardContent>

            <CardActions>
              <Button color="secondary" variant="contained" size="small">
                Actualizar
              </Button>
            </CardActions>
          </Box>

          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image="/src/assets/cody_profile.png"
            alt="green iguana"
          />
        </Card>

        {user?.posts && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Typography variant="h4" sx={{ mt: 2, fontWeight: "300" }}>
                Posts
              </Typography>

              <Button
                color="primary"
                variant="contained"
                component={NavLink}
                to="/post/create"
              >
                Crear post
              </Button>
            </Box>

            <PostList posts={user.posts} />
          </>
        )}
      </Box>
    </>
  );
}
