import React from "react";
import { Box, Container } from "@chakra-ui/react";

export const LoginLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container
      width="100vw"
      maxW="100vw"
      centerContent
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bg="green.100"
    >
      <Box maxW="s" bg="green.400" p="4" borderWidth="1px" borderRadius="lg">
        {children}
      </Box>
    </Container>
  );
};
