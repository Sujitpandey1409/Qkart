import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from '@mui/material';
import theme from './theme';

// TODO: CRIO_TASK_MODULE_REGISTER - Add Target container ID (refer public/index.html)
ReactDOM.render(
  
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  ,
  document.getElementById('root')
);
