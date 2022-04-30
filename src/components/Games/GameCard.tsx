import { Badge, Box, Image } from "@chakra-ui/react";
import React from "react";
import { Game } from "./games.types";

export const GameCard: React.FC<Game> = ({
  genre,
  image,
  platforms,
  price,
  tags,
  title,
}) => {
  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      aria-label={`Game card for: ${title}`}
      data-testid="game-card"
    >
      <Image src={image} alt={`Picture of ${title}`} />

      <Box w="100%" p="2">
        <Box display="flex" alignItems="baseline">
          {tags.map((tag) => (
            <Badge
              borderRadius="full"
              px="1"
              m="1"
              colorScheme="teal"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </Box>

        <Box display="flex" alignItems="baseline">
          {platforms.map((platform) => (
            <Badge
              borderRadius="full"
              px="1"
              m="1"
              colorScheme="teal"
              key={platform}
            >
              {platform}
            </Badge>
          ))}
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>

        <Box>${price.toFixed(2)}</Box>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          Game genre: {genre}
        </Box>
      </Box>
    </Box>
  );
};
