import { ShopContext } from "../context/shopContext";
import { useCallback, useContext, useEffect } from "react";
import { Box, Grid, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

export default function HomePage() {
  const { fetchAllProducts, products } = useContext(ShopContext);

  const getAllProducts = useCallback(() => fetchAllProducts(), [
    fetchAllProducts,
  ]);
  useEffect(() => {
    getAllProducts();
  }, []);

  if (!products) return <div>...loading</div>;

  return (
    <Box>
      <Hero />
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}>
        {products.map(({ id, handle, name, images, title, variants }) => {
          return (
            <Link key={id} to={`/product/${handle}`}>
              <Box _hover={{ opacity: "80%" }}>
                <Image alt={name} src={images[0].src} />
                <Text>{title}</Text>
                <Text>€{variants[0].price}</Text>
              </Box>
            </Link>
          );
        })}
      </Grid>
    </Box>
  );
}
