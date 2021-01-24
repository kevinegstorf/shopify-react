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
} from "@chakra-ui/react";

import { fetchProductWithHandle } from "../fetch";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  const { openCart, setCheckout, client } = useContext(ShopContext);

  useEffect(() => {
    const foo = async () => {
      const res = await fetchProductWithHandle(slug);

      setProduct(res);
    };

    foo();
  }, [slug]);

  const addItemToCheckout = async (variantId, quantity) => {
    // const checkout = await client.checkout.create();
    // localStorage.setItem("checkout_id", checkout.id);
    // setCheckout(checkout);

    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    const sendCheckout = await client.checkout.addLineItems(
      localStorage.checkout_id,
      lineItemsToAdd
    );

    setCheckout(sendCheckout);
  };

  if (!product) return <div>...loading</div>;
  return (
    <Box p="2rem">
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} m="auto">
        <Flex justifyContent="center" alignItems="center">
          <Image borderRadius="2%" src={product.images[0].src} />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          px="2rem"
        >
          <Heading pb="2rem">{product.title}</Heading>
          <Text fontWeight="bold" pb="2rem" fontSize="3xl">
            €{product.variants[0].price}
          </Text>
          <Text color="gray.500" pb="2rem">
            {product.description}
          </Text>
          <Button
            onClick={() => addItemToCheckout(product.variants[0].id, 1)}
            _hover={{ opacity: "70%" }}
            width="10rem"
            color="white"
            backgroundColor="#FF38BD"
          >
            Add To Cart
          </Button>
        </Flex>
      </Grid>
    </Box>
  );
}
