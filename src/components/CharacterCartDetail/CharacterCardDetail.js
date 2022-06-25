import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ItemCount from "../ItemCount/ItemCount";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CharacterCardDetail({ item }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { enCarro, addItem } = useContext(CartContext);
  const [buy, setBuy] = useState(true);
  const [qty, setqty] = useState(1);

  const handleAddCart = () => {
    if (enCarro(item.id)) {
      setBuy(false);
      toast.info("Este item ya se encuentra en el carrito", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (qty > 0) {
        setBuy(false);
        const newProduct = { ...item, quantity: qty };
        addItem(newProduct);
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 345}}>
      <CardMedia
        component="img"
        height="330"
        image={item.img}
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Nombre: {item.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Category: {item.category}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Stock: {item.stock}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Precio:{" "}
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(item.price)}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {!buy ? (
            <Link to="/cart">
              <Button>Finalizar Compra</Button>
            </Link>
          ) : (
            <ItemCount
              item={item}
              stock={item.stock}
              precio={item.price}
              onAdd={handleAddCart}
              quantity={qty}
              modifyQuantity={setqty}
            ></ItemCount>
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Descripcion: </Typography>
          <Typography paragraph>{item.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
