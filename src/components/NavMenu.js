import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function NavMenu() {
  const { isMenuOpen, closeMenu } = useContext(ShopContext);

  return (
    <Drawer isOpen={isMenuOpen} onClose={closeMenu} placement="left" size="sm">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack p="2rem">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/learn-more">Learn More</Link>
              <Link to="/contact-us">Contact Us</Link>
              <Link to="/">Sustainability</Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter textAlign="center">
            <Text>© Copyright www.blabla.com</Text>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
