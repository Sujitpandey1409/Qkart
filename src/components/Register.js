import React, { useState } from "react";
import { withRouter, Link } from 'react-router-dom';  // Import withRouter for history
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = ({ history }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfpassword] = useState('');
  const [loader, setLoader] = useState(false);

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  const register = async () => {
    if (validateInput()) {
      let formDataVal = { username, password };
      setLoader(true);
      try {
        const data = await axios.post(`${config.endpoint}/auth/register`, formDataVal);
        enqueueSnackbar('User registered successfully');
        setLoader(false);
        history.push('/login');  // Use history.push for navigation
      } catch (error) {
        setLoader(false);
        if (error.response) {
          enqueueSnackbar(error.response.data.message);
        } else {
          enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.');
        }
        // console.error(error);
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  const validateInput = () => {
    if (!username || !password || !confirmPassword) {
      enqueueSnackbar('All fields are required');
      return false;
    }
    if (username.length < 6 || password.length < 6) {
      enqueueSnackbar('Username & Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match');
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content" minHeight="100vh">
        <Stack spacing={3} className="form">
          <h2 className="title">Register</h2>
          <TextField
            onChange={(e) => { setUsername(e.target.value) }}
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            onChange={(e) => { setPassword(e.target.value) }}
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be at least 6 characters length"
            fullWidth
            placeholder="Enter a password with a minimum of 6 characters"
          />
          <TextField
            onChange={(e) => { setConfpassword(e.target.value) }}
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />
          {loader ? (
            <CircularProgress className="center"></CircularProgress>
          ) : (
            <Button className="button" variant="contained" onClick={register}>
              Register Now
            </Button>
          )}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default withRouter(Register);  // Use withRouter to access history prop
