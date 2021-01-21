import React from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API_KEY,
});

export default function ShopProvider({ children }) {
  const [checkout, setCheckout] = React.useState();

  const createCheckout = React.useCallback(async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout-id", checkout.id);
    console.log(checkout);
    setCheckout(checkout);
    // setState({ checkout, ...state });
  }, []);

  React.useEffect(() => {
    createCheckout();
  }, [createCheckout]);

  const fetchCheckout = async () => {};

  const addItemToCheckout = async () => {};

  const removeLineItem = async (ids) => {};

  const fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
  };

  const fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
  };

  const closeCart = () => {};

  const openCart = () => {};

  const openMenu = () => {};

  const closeMenu = () => {};

  console.log("state", checkout);

  return <ShopContext.Provider>{children}</ShopContext.Provider>;
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };
