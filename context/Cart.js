import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const CartProvider = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const initialCart = getInitialCart();
    if (initialCart) {
      setCart(initialCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    let newTotal = 0;

    cart.forEach((item) => (newTotal += item.price * item.qty));

    setTotal(newTotal);
  }, [cart]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const addItemToCart = (product, qty = 1) => {
    const item = cart.find((i) => i.id === product.id);

    if (item) {
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeItemFromCart = (product, qty = 1) => {
    const item = cart.find((i) => i.id === product.id);

    if (product.qty > 1) {
      item.qty -= qty;
      setCart([...cart]);
    } else {
      const newCart = cart.filter((item) => {
        return item.id !== product.id;
      });
      setCart(newCart);
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
    toggleCart,
    isOpen,
    total,
    clearCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default CartProvider;
