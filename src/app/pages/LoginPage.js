import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Cookies from "universal-cookie";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login, setAuthorizationHeader, getUserByEmail } from "../api/ApiCall";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const cookies = new Cookies();

export default function LoginPage() {
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const params = new URLSearchParams();
    params.append("username", data.get("email"));
    params.append("password", data.get("password"));
    await login(params, config).then((response) =>
      cookies.set("jwtToken", response.data.access_token, { path: "/" })
    );

    if (cookies.get("jwtToken")) {
      cookies.set("isLoggedIn", true, { path: "/" });
      setAuthorizationHeader(
        cookies.get("jwtToken"),
        cookies.get("isLoggedIn")
      );
      

      await getUserByEmail(data.get("email")).then((response) => {
        cookies.set("userRole",response.data.roles[0].name,{ path: "/" });
        cookies.set("userId",response.data.id,{ path: "/" });
      });
      navigate("/user-quiz")
    }

    console.log({
      username: data.get("email"),
      password: data.get("password"),
    });

    


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Giriş Yap
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail Adresinizi Giriniz."
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="password"
              label="Şifrenizi Giriniz."
              type="password"
              id="password"
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Giriş Yap
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Hesabınız yoksa kayıt olun."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
