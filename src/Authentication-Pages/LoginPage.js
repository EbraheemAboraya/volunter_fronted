import React, { useState } from "react";
// import { styled } from "@mui/material";
import { TextField, Button, Typography, Container } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import RegisterPage from "./RegisterPage";


const useStyles = makeStyles((theme) => ({
  form: {
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    background: "#FFF",
  },
  textField: {
    marginBottom: "20px",
    width: "100%",
    marginTop: "10px",
  },
  button: {
    marginTop: "20px",
    width: "100%",
  },
}));



// 
function LoginPage({ handleLogin }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const handleRegister = (username, password) => {
    // Implement your registration logic here
    console.log("Registering...");
  };

  const handleNavigateToRegister = () => {
    setShowRegisterForm(true);
  };

  const handleNavigateToLogin = () => {
    setShowRegisterForm(false);
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showRegisterForm ? (
        <RegisterPage
          handleRegister={handleRegister}
          navigateToLogin={handleNavigateToLogin}
        />
      ) : (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ marginBottom: "25px" }}
          >
            Login
          </Typography>
          <TextField
            className={classes.textField}
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            style={{ marginTop: "10px" }}
            className={classes.textField}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            fullWidth
            style={{ marginTop: "10px" }}
            onClick={handleNavigateToRegister}
          >
            Register
          </Button>
        </form>
      )}
    </Container>
  );
}

export default LoginPage;