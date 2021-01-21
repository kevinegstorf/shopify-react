import React from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API_KEY,
});

export default function ShopProvider({ children }) {
  const [checkout, setCheckout] = React.useState();
  const [product, setProduct] = React.useState();
  const [products, setProducts] = React.useState();

  const createCheckout = React.useCallback(async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout.id);
    console.log(checkout);
    setCheckout(checkout);
  }, []);

  React.useEffect(() => {
    localStorage.checkout_id
      ? fetchCheckout(localStorage.checkout_id)
      : createCheckout();
  }, [createCheckout]);

  const fetchCheckout = async (checkout_id) => {
    const checkout = client.checkout.fetch(checkout_id);
    setCheckout(checkout);
  };

  const addItemToCheckout = async () => {};

  const removeLineItem = async (ids) => {};

  const fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    setProducts(products);
  };

  const fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    setProduct(product);
  };

  const closeCart = () => {};

  const openCart = () => {};

  const openMenu = () => {};

  const closeMenu = () => {};

  return (
    <ShopContext.Provider
      value={{
        checkout,
        product,
        products,
        fetchAllProducts: fetchAllProducts,
        fetchProductWithHandle,
        addItemToCheckout: addItemToCheckout,
        closeCart: closeCart,
        closeMenu: closeMenu,
        openCart: openCart,
        openMenu: openMenu,
        removeLineItem: removeLineItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };
