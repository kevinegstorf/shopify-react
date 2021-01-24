import { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Grid,
  Text,
  Flex,
  Image,
  Link,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";
export default function Cart() {
  const { isCartOpen, closeCart, client, checkout, setCheckout } = useContext(
    ShopContext
  );
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const fetchCheckout = async () => {
      const checkout = await client.checkout.fetch(localStorage.checkout_id);
      console.log(checkout);
      setCheckout(checkout);
    };
    fetchCheckout();
  }, []);

  const removeLineItem = async (ids) => {
    const checkout = await client.checkout.removeLineItems(
      localStorage.checkout_id,
      ids
    );
    setCheckout(checkout);
  };

  return (
    <>
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={closeCart}
        size="sm"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Shopping Cart</DrawerHeader>
            <DrawerBody>
              {checkout?.lineItems && checkout?.lineItems.length ? (
                checkout.lineItems.map((item) => (
                  <Grid templateColumns="repeat(4, 1fr)" gap={1} key={item.id}>
                    <Flex alignItems="center" justifyContent="center">
                      <CloseIcon
                        cursor="pionter"
                        onClick={() => removeLineItem(item.id)}
                      />
                    </Flex>
                    <Flex alignItems="center" justifyContent="center">
                      <Image src={item.variant.image.src} />
                    </Flex>
                    <Flex alignItems="center" justifyContent="center">
                      <Text>{item.title}</Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center">
                      <Text>€{item.variant.price}</Text>
                    </Flex>
                  </Grid>
                ))
              ) : (
                <Box h="100%" w="100%">
                  <Text
                    h="100%"
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Empty Shopping Cart
                  </Text>
                </Box>
              )}
            </DrawerBody>
            {checkout && checkout?.lineItems?.length ? (
              <DrawerFooter>
                <Button w="100%">
                  <Link w="100%" href={checkout && checkout.webUrl}>
                    Checkout
                  </Link>
                </Button>
              </DrawerFooter>
            ) : null}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
