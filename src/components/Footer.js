import { Box, Grid, Image, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box color="white" backgroundColor="#FFA8E2" fontWeight="bold">
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}>
        <Image src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Bath_Bomb_-_Product-5_-_trans_1.png?v=1610123549" />
        <VStack p="2rem">
          <Link to="/">The Green Blast</Link>
          <Link to="/">The Blue Berry</Link>
          <Link to="/">The Yellow Mellow</Link>
        </VStack>
        <VStack p="2rem">
          <Link to="/">About Us</Link>
          <Link to="/">Lear More</Link>
          <Link to="/">Contact Us</Link>
        </VStack>
      </Grid>
      <Box>
        <Text
          textAlign="center"
          color="white"
          w="100%"
          borderTop="1px solid white"
          p="1rem"
        >
          © Copyright www.blabla.com
        </Text>
      </Box>
    </Box>
  );
}
