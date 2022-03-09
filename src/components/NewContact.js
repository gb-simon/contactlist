import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ButtonNewContact() {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Accordion sx={{ maxWidth: 345 }}>
          <AccordionSummary
            expandIcon={
              <div>
                {/* <Button size="small">Edit Contact</Button>   */}{" "}
                <ExpandMoreIcon />
              </div>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <CardMedia
              component="img"
              height="140"
              image="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
              alt="default profile picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                New Contact
              </Typography>
            </CardContent>
            <CardActions justifyContent="center">
              {/* <Button size="small">Delete Contact</Button Must be inside edit contact section */}
            </CardActions>
          </AccordionSummary>
          <AccordionDetails>
            <form>
              <div>
                <input type="text" placeholder="name" />
                <input type="text" placeholder="surname" />
                <input type="text" placeholder="e-mail" />
              </div>
              <Button type="submit" size="small">Add Contact</Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </Card>
    </div>
  );
}
