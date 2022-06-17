import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function CharacterCard({ data }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="450"
        image={data.img}
        alt={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Nombre: {data.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Categoria: {data.category}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;
