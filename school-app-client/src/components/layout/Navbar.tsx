import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box, { BoxProps } from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import FormControlLabelComponent from "../FormControlLabel";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        m: 1,
        border: "1px solid",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            School Management
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 1,
              m: 1,
              borderRadius: 1,
              paddingRight: 10,
            }}
          >
            <Item>
              <Link href={"/student"}>Student</Link>
            </Item>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
