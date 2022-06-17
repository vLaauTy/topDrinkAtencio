import { FaCartPlus } from "react-icons/fa";
import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
function CartWidget() {
  const { items, itemsTotal } = useContext(CartContext);

  return (
    <div>
      <Link to="/cart" style={{textDecoration:'none'}}>
        <div style={{ visibility: items.length === 0 ? "hidden" : "visible" }}>
          <FaCartPlus size="1.5em" style={{color:'white'}}></FaCartPlus>
          <span className="mx-3" style={{color:'white'}}> {itemsTotal()} </span>
        </div>
      </Link>
    </div>
  );
}
export default CartWidget;
