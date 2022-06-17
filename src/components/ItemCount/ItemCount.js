import React from "react";

function ItemCount({ stock, modifyQuantity, quantity, onAdd }) {
  function add() {
    if (quantity < stock && quantity >= 1) {
      modifyQuantity(quantity + 1);
    }
  }

  function subtract() {
    if (quantity > 1) {
      modifyQuantity(quantity - 1);
    }
  }

  return (
    <div>
      <h3> {quantity} </h3>

      <button
        onClick={add}
        disabled={quantity === stock}
        className="btn btn-primary mx-2"
      >
        +
      </button>
      <button
        onClick={subtract}
        disabled={quantity === 1}
        className="btn btn-warning mx-2"
      >
        -
      </button>

      <button
        onClick={(quantity) => onAdd(quantity)}
        className="btn btn-success"
      >
        Agregar al Carrito
      </button>
    </div>
  );
}

export default ItemCount;
