import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Heading,
  Flex,
  Center,
} from "@chakra-ui/react";

import { fetchProductWithHandle } from "../fetch";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  const { openCart } = useContext(ShopContext);

  useEffect(() => {
    const foo = async () => {
      const res = await fetchProductWithHandle(slug);

      setProduct(res);
    };

    foo();
  }, [slug]);

  if (!product) return <div>...loading</div>;
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)">
        <Image src={product.images[0].src} />
        <Box>
          <Heading>{product.title}</Heading>
          <Text>{product.variants[0].price}</Text>
          <Text>{product.description}</Text>
          <Button onClick={() => openCart()}>Add To Cart</Button>
        </Box>
      </Grid>
    </Box>
  );
}
