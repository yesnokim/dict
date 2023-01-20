import { AppBar, Box, CssBaseline, Drawer, IconButton, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import QuizPage from "./pages/QuizPage/QuizPage";
import MenuIcon from '@mui/icons-material/Menu';
import DrawMenu from "./components/DrawMenu/DrawMenu";

function App() {
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" open={open} style={{ height: "55px" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggle}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            이안이와 아윤이의 영어공부
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={handleToggle}>
          <DrawMenu onDrawerToggle={handleToggle} />
        </SwipeableDrawer>
      </Box>
      <Box component="main">
        <QuizPage />
      </Box>
    </Box>
  );
}

export default App;
