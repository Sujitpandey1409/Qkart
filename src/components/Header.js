import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Avatar, Button, Stack, TextField, InputAdornment } from "@mui/material";
import { withRouter } from "react-router-dom"; // Import withRouter for history
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons, history, onChange }) => {
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  // console.log(children);

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children && <TextField onChange={onChange}
        className="search-desktop"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />}
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push('/')}
        >
          Back to explore
        </Button>
      ) : localStorage.getItem('token') ? (
        <Box display="flex" gap="2px" alignItem="center">
          <Avatar
            variant="circular"
            src="https://e7.pngegg.com/pngimages/442/477/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png"
            alt={localStorage.getItem('username')}
          ></Avatar>
          <Box display="flex" marginTop="9px">
            {localStorage.getItem('username')}
          </Box>
          <Button onClick={handleLogout}>LOGOUT</Button>
        </Box>
      ) : (
        <Box display="flex" gap="4px">
          <Button onClick={() => history.push('/login')}>LOGIN</Button>
          <Button
            variant="contained"
            onClick={() => history.push('/register')}
          >
            REGISTER
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default withRouter(Header); // Use withRouter to access history prop
