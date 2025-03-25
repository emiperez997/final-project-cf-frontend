import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useState, MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import { green } from "@mui/material/colors";

const pages = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Posts",
    path: "/posts",
  },
  {
    name: "Contacto",
    path: "/contact",
  },
];
const mobilePages = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Posts",
    path: "/posts",
  },
  {
    name: "Contacto",
    path: "/contact",
  },
  {
    name: "Iniciar Sesión",
    path: "/login",
  },
];
const settings = [
  {
    name: "Perfil",
    path: "/profile",
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
];

export function Navbar() {
  const { isAuth, user, logout } = useAppStore((state) => state);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="info">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <img
            src="/src/assets/logo-cf.png"
            alt="Logo Código Facilito"
            loading="lazy"
            height={30}
            width={30}
          />
          <Typography
            color="primary"
            variant="h6"
            component="h6"
            sx={{ flexGrow: 1, ml: 2 }}
          >
            Blog de Cody
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: isAuth ? "start" : "end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {mobilePages.map(({ name, path }) => {
                if (name === "Iniciar Sesión" && isAuth) {
                  return null;
                }

                return (
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <NavLink
                      to={path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Typography color="primary" sx={{ textAlign: "center" }}>
                        {name}
                      </Typography>
                    </NavLink>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: isAuth ? "start" : "end",
            }}
          >
            {pages.map(({ name, path }) => (
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  key={name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  <Typography color="primary" sx={{ textAlign: "center" }}>
                    {name}
                  </Typography>
                </Button>
              </NavLink>
            ))}
          </Box>
          {isAuth ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgColor: green["200"] }}>
                    {user?.email.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ name, path }) => {
                  if (user?.role === "user" && name === "Perfil") {
                    return (
                      <MenuItem key={name} onClick={handleCloseUserMenu}>
                        <NavLink
                          to={path}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <Typography
                            color="primary"
                            sx={{ textAlign: "center" }}
                          >
                            {name}
                          </Typography>
                        </NavLink>
                      </MenuItem>
                    );
                  } else if (user?.role === "admin" && name === "Dashboard") {
                    return (
                      <MenuItem key={name} onClick={handleCloseUserMenu}>
                        <NavLink
                          to={path}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <Typography
                            color="primary"
                            sx={{ textAlign: "center" }}
                          >
                            {name}
                          </Typography>
                        </NavLink>
                      </MenuItem>
                    );
                  }
                })}

                <MenuItem onClick={handleCloseUserMenu}>
                  <Button color="error" variant="contained" onClick={logout}>
                    Cerrar Sesión
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              color="primary"
              variant="contained"
              sx={{ ml: 2, display: { xs: "none", md: "flex" } }}
              component={NavLink}
              to="/login"
            >
              Iniciar Sesión
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
