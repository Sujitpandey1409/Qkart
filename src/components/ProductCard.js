import { AddShoppingCartOutlined, Image, Star } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Grid item xs={6} md={3} padding="4px">
      <Card className="card" width="97vw">
      <img src={product.image} alt={product.name} width='100%' height="100%" />
      <div className="cart-textIcon">
      <p>{product.name}</p>
      <h4>${product.cost}</h4>
      <Rating style={{'marginBottom':'11px'}} name="read-only" value={product.rating} readOnly/>
      </div>
      <Button id={product._id} onClick={handleAddToCart} variant="contained"><AddShoppingCartOutlined  /> ADD TO CART</Button>
      </Card>
    </Grid>
    // <Card className="card" width="97vw">
    //   <img src={product.image} alt={product.name} width='100%' height="100%" />
    //   <p>{product.name}</p>
    //   <h4>${product.cost}</h4>
    //   <Rating name="read-only" value={product.rating} readOnly/>
    //   <Button variant="contained"><AddShoppingCartOutlined style={{ marginRight: '7px' }} /> ADD TO CART</Button>
    // </Card>
  );
};

export default ProductCard;
