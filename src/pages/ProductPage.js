import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import Client from "shopify-buy";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API_KEY,
  });

  const { addItemToCheckout } = useContext(ShopContext);

  const fetchProductWithHandle = async (slug) => {
    console.log(slug);
    const res = await client.product.fetchByHandle(slug);
    setProduct(res);
  };

  useEffect(() => {
    fetchProductWithHandle(slug);
  }, [slug]);

  if (!product) return <div>...loading</div>;
  return <div>{product.title}</div>;
}
