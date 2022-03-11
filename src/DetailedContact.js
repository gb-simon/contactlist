import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function DetailedContact() {
    
    const contact = {
        "id": 1,
        "email": "george.bluth@reqres.in",
        "first_name": "George",
        "last_name": "Bluth",
        "avatar": "https://reqres.in/img/faces/1-image.jpg"
    }

  return (
    <Grid  justifyContent="center" align="center" pt={6}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" image={contact.avatar} alt="a contact portfolio" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">{contact.first_name}</Typography>
          <Typography gutterBottom variant="h6" component="div">{contact.last_name}</Typography>
        </CardContent>
        <Typography gutterBottom variant="h7" component="div">{contact.email}</Typography>
        <CardActions>
          <Link style={{ textDecoration:"none" }} to="/">
            <Button size="small">Go Back</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default DetailedContact;
