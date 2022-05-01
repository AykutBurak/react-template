import React from "react";
import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { useCurrentUser } from "components/Auth/userQueries";
import { useLogoutMutation } from "components/Auth/authQueries";
import { Link } from "react-router-dom";

export const NavBar: React.FC<Record<string, never>> = () => {
  const logoutMutation = useLogoutMutation();
  const currentUser = useCurrentUser();

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <Link to="/games">
          <Heading>My App</Heading>
        </Link>
        <Box ml={"auto"}>
          <Flex align="center">
            <Box mr={2} data-testid="nav-bar-username">
              {currentUser.data?.username}
            </Box>
            <Button
              onClick={() => logoutMutation.mutate()}
              isLoading={logoutMutation.isLoading}
              variant="link"
            >
              Logout
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
