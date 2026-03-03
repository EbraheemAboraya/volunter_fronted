import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Container,
  Grid,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [availability, setAvailability] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [skills, setSkills] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!avatar) {
        alert("Please import an image");
        return;
      }

      const formData = new FormData();
      formData.append("fullName", `${firstName} ${lastName}`);
      formData.append("userName", username);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("selectedFile", avatar);
      const token = AuthService.getToken("authToken");

      if (lookingFor === "volunteer") {
        formData.append("sex", sex);
        formData.append("age", dob);
        formData.append("skills", skills);
        formData.append("availability", availability);
        const response = await TutorialDataService.registervolunteer(
          formData,
          token
        );
        console.log("Registration successful:", response.data);
      } else {
        const response = await TutorialDataService.registerOrganizer(
          formData,
          token
        );
        console.log("Registration successful:", response.data);
      }
      window.location.href = "/";

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLookingForChange = (e) => {
    setLookingFor(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/";
  };

  return (
    <Container
      maxWidth="sm"
      style={{ background: "#FFF", borderRadius: "5px" }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Registration
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginBottom={2}
      >
        <Box position="relative" marginBottom={1}>
          <Avatar
            alt="User Avatar"
            src={avatar ? URL.createObjectURL(avatar) : ""}
            sx={{ width: 100, height: 100 }}
          />
          <input
            accept="image/*"
            id="avatar-input"
            type="file"
            onChange={handleAvatarChange}
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
        </Box>
        <label htmlFor="avatar-input">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
      </Box>
      <div style={{ maxWidth: "100%", overflowY: "auto", maxHeight: "72vh" }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  What are you looking for?
                </FormLabel>
                <RadioGroup
                  aria-label="looking-for"
                  name="looking-for"
                  value={lookingFor}
                  onChange={handleLookingForChange}
                >
                  <FormControlLabel
                    value="volunteer"
                    control={<Radio />}
                    label="To volunteer"
                  />
                  <FormControlLabel
                    value="search"
                    control={<Radio />}
                    label="To Search for Volunteers"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {lookingFor === "volunteer" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Availability"
                    variant="outlined"
                    fullWidth
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Sex</FormLabel>
                    <RadioGroup
                      aria-label="sex"
                      name="sex"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Skills"
                    variant="outlined"
                    fullWidth
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </Grid>
              </>
            )}
            {lookingFor === "search" && <Grid item xs={12}></Grid>}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleBackToLogin} 
              >
                Back to Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegistrationForm;
