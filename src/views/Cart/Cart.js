import React, { useContext } from "react";
import { CartContext } from "../../components/CartContext/CartContext";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const { items, clearItems,precioTotal,itemsTotal, removeItem, añadir, sacar } = useContext(CartContext);
  



  return (
    <div className='container-fluid py-3'>
        {items.length === 0 ?
        <div className="">
          <h3>Carrito vacio!, Comienze a comprar</h3>
          <Button>
            <Link to="/">Home</Link>
          </Button>
        </div>
        :

            <div className="row justify-content-center">
                <h4 className="text-center py-3 text-decoration-underline">Carrito</h4>
                <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-4">
                    <div className="d-flex justify-content-center py-3">
                        <p className='fw-bolder text-title'>Total Items <span className="postition-absolute translate-middle rounded-pill badge bg-success mx-1">{itemsTotal()}</span></p>
                    </div>
                    <div>
                        <table className="table table-light table-hover m-0">
                            <tbody>
                                {items.map((item, index) => {
                                    return (
                                      <tr key={index} className="align-middle">
                                        <td>
                                          <img
                                            src={item.img}
                                            className="img-cart"
                                            alt={item.title}
                                          />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>Precio: ${item.price}</td>
                                        <td>Cantidad: {item.quantity}</td>
                                        <td>Stock: {item.stock}</td>
                                        <td>
                                          Subtotal:{" "}
                                          {new Intl.NumberFormat("es-AR", {
                                            style: "currency",
                                            currency: "ARS",
                                          }).format(item.price * item.quantity)}
                                        </td>
                                        <td>
                                          <button
                                            onClick={() => sacar(item)}
                                            className="btn btn-outline-dark ms-1"
                                          >
                                            -
                                          </button>
                                          <button
                                            onClick={() => añadir(item)}
                                            className="btn btn-outline-dark ms-1"
                                          >
                                            +
                                          </button>
                                          <button
                                            onClick={() => removeItem(item.id)}
                                            className="btn btn-outline-danger ms-5"
                                          >
                                            Remove Item
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between py-5">
                        <button onClick={() => clearItems()} className="btn btn-outline-danger">Clear All</button>
                        <h3>
            Total:{" "}
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(precioTotal())}
          </h3>
          <Link to="/checkout">
            <button type="button" className="btn btn-success">Checkout</button>
          </Link>
                    </div>
                </div>
            </div>
}
        </div>
  );
};

