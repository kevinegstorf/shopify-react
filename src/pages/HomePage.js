import { ShopContext } from "../context/shopContext";
import { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { fetchAllProducts, products } = useContext(ShopContext);

  const getAllProducts = useCallback(() => fetchAllProducts(), [
    fetchAllProducts,
  ]);
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);

  if (!products) return <div>...loading</div>;

  return (
    <div>
      {products.map((product) => {
        console.log(product);
        return (
          <div key={product.id}>
            <Link to={`/product/${product.handle}`}>
              <h1>{product.title}</h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
