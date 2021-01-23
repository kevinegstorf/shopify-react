import { useContext } from "react";
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
} from "@chakra-ui/react";
export default function Cart() {
  const { isCartOpen, closeCart, checkout, removeLineItem } = useContext(
    ShopContext
  );
  return (
    <>
      <Drawer isOpen={isCartOpen} placement="right" onClose={closeCart}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Shopping Cart</DrawerHeader>

            <DrawerBody>This is your Cart</DrawerBody>

            <DrawerFooter>
              <Button>Checkout</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
