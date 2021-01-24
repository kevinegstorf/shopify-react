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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const createCheckout = React.useCallback(async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout.id);
    setCheckout(checkout);
  }, []);

  React.useEffect(() => {
    localStorage.checkout_id
      ? fetchCheckout(localStorage.checkout_id)
      : createCheckout();
    setCheckout(localStorage.checkout_id);
    console.log(checkout);
  }, []);

  const fetchCheckout = async (checkout_id) => {
    const checkout = await client.checkout.fetch(checkout_id);
    setCheckout(checkout);
  };

  // const addItemToCheckout = async (variantId, quantity) => {
  //   const lineItemsToAdd = [
  //     {
  //       variantId,
  //       quantity: parseInt(quantity, 10),
  //     },
  //   ];

  //   const sendCheckout = await client.checkout.addLineItems(
  //     checkout.id,
  //     lineItemsToAdd
  //   );

  //   setCheckout(sendCheckout);
  //   setIsCartOpen(true);
  // };

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
  };

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log("from Context", checkout);
  return (
    <ShopContext.Provider
      value={
        (fetchProductWithHandle,
        openCart,
        {
          checkout,
          setCheckout,
          product,
          products,
          fetchAllProducts: fetchAllProducts,
          closeCart: closeCart,
          openCart: openCart,
          openMenu: openMenu,
          removeLineItem: removeLineItem,
          isCartOpen,
          isMenuOpen,
          closeMenu,
          client,
        })
      }
    >
      {children}
    </ShopContext.Provider>
  );
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };
