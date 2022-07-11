import React, { createContext } from "react";
import useLocalStorage from "../useLocalStorage";

const key = "cart";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useLocalStorage(key, []);

  // COMPROBACION SI EL ITEM YA ESTA EN EL CARRO
  const enCarro = (itemid) => {
    return items.some((item) => item.id === itemid);
  };

  // AÑADIR ITEM AL CARRO

  const addItem = (item) => {
    setItems([
      ...items,
      {
        id: item.id,
        name: item.name,
        img: item.img,
        stock: item.stock,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        priceItem: item.quantity * item.price,
        description: item.description,
      },
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // VACIAR CARRITO
  const clearItems = () => {
    setItems([]);
  };

  // AÑADIR UNA UNIDAD MAS ESTANDO EN EL CARRITO

  const añadir = (item) => {
    const mas = items.find((itemCart) => itemCart.id === item.id);
    setItems(
      items.map((itemCart) => {
        if (itemCart.id === item.id && itemCart.quantity < item.stock) {
          return { ...mas, quantity: mas.quantity + 1 };
        } else return itemCart;
      })
    );
  };

  // SACAR UNA UNIDAD  ESTANDO EN EL CARRITO
  const sacar = (item) => {
    const mas = items.find((itemCart) => itemCart.id === item.id);

    if (mas.quantity === 1) {
      setItems(items.filter((itemCart) => itemCart.id !== item.id));
    } else {
      setItems(
        items.map((itemCart) => {
          if (itemCart.id === item.id) {
            return { ...mas, quantity: mas.quantity - 1 };
          } else return itemCart;
        })
      );
    }
  };

  // PRECIO TOTAL
  function precioTotal() {
    return items.reduce(
      (counter, product) => counter + product.price * product.quantity,
      0
    );
  }

  // CANTIDAD DE ITEMS TOTAL

  function itemsTotal() {
    return items.reduce((counter, item) => counter + item.quantity, 0);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        removeItem,
        clearItems,
        añadir,
        sacar,
        enCarro,
        addItem,
        precioTotal,
        itemsTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
