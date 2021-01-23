import Client from "shopify-buy";

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API_KEY,
});

const fetchProductWithHandle = async (handle) => {
  const product = await client.product.fetchByHandle(handle);
  return product;
};

export { fetchProductWithHandle };
