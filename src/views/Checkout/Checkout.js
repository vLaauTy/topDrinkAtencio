import React, { useContext,  useState } from "react";
import { CartContext } from "../../components/CartContext/CartContext";
import { db } from "../../firebase/FirebaseConfig";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import MessageSuccess from "../Mensaje/MessageSucess";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Checkout = () => {
  const { items, clearItems,precioTotal } = useContext(CartContext);
  const [client, setClient] = useState({
    nombre: "",
    telefono: "",
    email: "",
    emailCheck: "",
  });
  const [purchaseID, setPurchaseID] = useState("");
  const [state, setState] = useState(true);

  console.log(items.length);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  const endPurchase = () => {
    const orden = {
      client,
      items: items,
      date: serverTimestamp(),
      total: precioTotal(),
    };

    const ordenesCollection = collection(db, "ordenes");
    const pedido = addDoc(ordenesCollection, orden);

    if (
      client.nombre &&
      client.telefono &&
      client.email &&
      client.emailCheck === client.email
    ) {
      pedido
        .then((res) => {
          setPurchaseID(res.id);
          setState(false);
          toast.success("Compra realizada!", {
            position: toast.POSITION.TOP_LEFT,
          });
        })
        .catch((error) => {
          toast.error("Hubo un error", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .finally(() => {
          clearItems();
        });
    } else {
      toast.error("Completar datos!", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    }
  };


  return (
    <div>
      {items.length === 0 ? <div><h3>Formulario no disponible!, Comienze a comprar</h3>
          <Button>
            <Link to="/">Home</Link>
          </Button>
          </div> :
      <div className="d-flex justify-content-center">
        {state ? (
          <div className="" style={{ width: "70%" }}>
            <form action="/action_page.php">
              <div className="mb-5 mt-4">
                <label for="email" class="form-label">
                  Nombre:
                </label>
                <input
                  value={client.nombre}
                  name="nombre"
                  className="form-control"
                  type="text"
                  id="nombre"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5 mt-4">
                <label for="pwd" class="form-label">
                  Teléfono:
                </label>
                <input
                  value={client.telefono}
                  name="telefono"
                  id="telefono"
                  className="form-control"
                  type="number"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5 mt-4">
                <label for="pwd" class="form-label">
                  Email:
                </label>
                <input
                  value={client.email}
                  name="email"
                  id="email"
                  type="email"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 mt-4">
                <label for="pwd" class="form-label">
                  Re-ingrese su email:{" "}
                </label>
                <input
                  value={client.emailCheck}
                  name="emailCheck"
                  id="emailCheck"
                  type="email"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </form>
            <button
              className="btn btn-outline-info text-center mt-5 ml-5"
              onClick={() => endPurchase()}
            >
              Finalizar Compra
            </button>
          </div>
        ) : (
          <div>
            {purchaseID && (
              <div>
                <MessageSuccess purchaseID={purchaseID} />
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
}
    </div>
  );
};

export default Checkout;
