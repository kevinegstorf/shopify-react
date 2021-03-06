import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Flex, Icon, Image, Box, Badge } from "@chakra-ui/react";
import { MdMenu, MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { openCart, openMenu, checkout } = useContext(ShopContext);

  return (
    <Flex
      backgroundColor="#FFA8E2"
      flexDir="row"
      justifyContent="space-between"
      p="2rem"
      alignItems="center"
    >
      <Icon
        fill="white"
        as={MdMenu}
        w={30}
        h={30}
        cursor="pointer"
        onClick={() => openMenu()}
      />
      <Link to="/">
        <Image
          src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Logologo_1.svg?v=1610055540"
          w={100}
          h={100}
        />
      </Link>
      <Box>
        <Icon
          onClick={() => openCart()}
          fill="white"
          as={MdShoppingBasket}
          w={30}
          h={30}
          cursor="pointer"
        />
        {checkout && checkout.lineItems?.length >= 1 ? (
          <Badge backgroundColor="#FF388D" borderRadius="50%">
            {checkout && checkout.lineItems?.length}
          </Badge>
        ) : null}
      </Box>
    </Flex>
  );
}
