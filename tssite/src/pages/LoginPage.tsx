import AuthContext from "../context/AuthContext";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { config } from "../config";
import jwtDecode from "jwt-decode";
import { AuthTokenResponse } from "../models";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Box,
  CssBaseline,
  Link,
  Container,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fabProgress: {
    position: "absolute",
    top: "40%",
    zIndex: 1,
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginPage = () => {
  let { setAuthTokens, setDecodedAuthToken } = useContext(AuthContext);

  const classes = useStyles();

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(event.currentTarget);

    let submitFailedTemp = false;
    const url = `${config.apiUrl}/token/`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    })
      .then((response) => {
        if (!response.ok) {
          submitFailedTemp = true;
          return null;
        }
        return response.json();
      })
      .then((data: AuthTokenResponse | null) => {
        var errorMsg = "";
        if (submitFailedTemp) {
          errorMsg = "Failed to authenticate, try again!";
        }
        if (data) {
          localStorage.setItem("authTokens", JSON.stringify(data));
          if (setAuthTokens) {
            setAuthTokens(data);
          }
          if (setDecodedAuthToken) {
            setDecodedAuthToken(jwtDecode(data.access));
          }
          navigate("/");
        } else {
          errorMsg = "Login attempt failed, try again!";
        }
        setErrorMsg(errorMsg);
        setSubmitting(false);
      });
  };

  return (
    <div className={classes.wrapper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={errorMsg.trim() !== ""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errorMsg.trim() !== ""}
            />
            <Typography color="error">{errorMsg}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
          {submitting && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
