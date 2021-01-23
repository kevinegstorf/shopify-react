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
  const [isCartOpen, setIsCartOpen] = React.useState();

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
    setCheckout(localStorage.checkout_id);
  }, [createCheckout]);

  const fetchCheckout = async (checkout_id) => {
    const checkout = client.checkout.fetch(checkout_id);
    setCheckout(checkout);
  };

  const test = (variantId, quantity) => {
    const addItemToCheckout = async (variantId, quantity) => {
      const lineItemsToAdd = [
        {
          variantId,
          quantity: parseInt(quantity, 10),
        },
      ];

      const sendCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItemsToAdd
      );

      setCheckout(sendCheckout);
      setIsCartOpen(true);
    };
    addItemToCheckout(variantId, quantity);
  };

  const removeLineItem = async (ids) => {};

  const fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    setProducts(products);
  };

  const fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    setProduct(product);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(!isCartOpen);

    console.log(isCartOpen);
  };

  const openMenu = () => {};

  const closeMenu = () => {};

  return (
    <ShopContext.Provider
      value={
        (fetchProductWithHandle,
        openCart,
        test,
        {
          checkout,
          product,
          products,
          fetchAllProducts: fetchAllProducts,
          closeCart: closeCart,
          closeMenu: closeMenu,
          openCart: openCart,
          openMenu: openMenu,
          removeLineItem: removeLineItem,
          isCartOpen,
        })
      }
    >
      {children}
    </ShopContext.Provider>
  );
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };
