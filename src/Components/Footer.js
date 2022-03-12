import { Box, Container, Grid, Typography } from "@mui/material";
import "./../App.css";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box px={{ xs: 1, sm: 1 }} py={{ xs: 1, sm: 1 }} bgcolor="#3f50b5" mt={5}>
        <Container>
          <Grid container justifyContent="center" mt={2}>
            <Grid className="rowFooter">
              <Box ml={4}>
                <Typography variant="h6">
                  <a href="https://gbsimon.com/">My Site</a>
                </Typography>
              </Box>
              <Box ml={4}>
                <Typography variant="h6">
                  <a href="https://gonzalosimon.hashnode.dev/">Blog</a>
                </Typography>
              </Box>
              <Box ml={4}>
                <Typography variant="h6">
                  <a href="https://www.linkedin.com/in/gonzalo-simon-aguilar/">
                    LinkedIn
                  </a>
                </Typography>
              </Box>
              <Box ml={4}>
                <Typography variant="h6">
                  <a href="https://github.com/gb-simon">GitHub</a>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={1}>
              <p>
                Gonzalo Simon <br />
                <p>aguilarsimon01@gmail.com</p>
              </p>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
