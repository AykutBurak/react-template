import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/react";
import { useCurrentUser } from "components/Auth/userQueries";
import { useLogoutMutation } from "components/Auth/authQueries";

export const NavBar: React.FC<Record<string, never>> = () => {
  const logoutMutation = useLogoutMutation();
  const currentUser = useCurrentUser();

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        {/* <NextLink href="/"> */}
        <Link>
          <Heading>LiReddit</Heading>
        </Link>
        {/* </NextLink> */}
        <Box ml={"auto"}>
          <Flex align="center">
            {/* <NextLink href="/create-post">
              <Button as={Link} mr={4}>
                create post
              </Button>
            </NextLink> */}
            <Box mr={2}>{currentUser.data?.username}</Box>
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
