import { Box, Center, Image, Text, Button } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box
      color="white"
      backgroundColor="#FFA8E2"
      position="relative"
      overflow="hidden"
      h="70vh"
      w="100%"
    >
      <Image
        src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Bath_Bomb_-_Product-4_-_nobg_1.png?v=1610055851.jpg"
        h="100%"
        m="auto"
        objectFit="contain"
        objectPosition={["top", "center"]}
      />
      <Text
        position="absolute"
        bottom="20%"
        w="100%"
        textAlign="center"
        fontWeight="bold"
        fontSize="4rem"
      >
        Introducing Bath Bombs
      </Text>
      <Center>
        <Button
          w="10rem"
          _hover={{ opacity: "70%" }}
          position="absolute"
          top="35rem"
          backgroundColor="#FF38BD"
        >
          Shop Now
        </Button>
      </Center>
    </Box>
  );
}
