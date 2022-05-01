// import { GameCard } from "components/Games/GameCard";
import { Button, Center, SimpleGrid } from "@chakra-ui/react";
import { GameCard } from "components/Games/GameCard";
import { useInfiniteGames } from "components/Games/gamesQueries";
import React from "react";

export const Games: React.FC<Record<string, never>> = () => {
  const { data, isSuccess, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteGames();

  if (isSuccess && data?.pages) {
    return (
      <div>
        {data.pages.map((page, index) => (
          <SimpleGrid columns={3} spacing={10} key={index} mb="10">
            {page.games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </SimpleGrid>
        ))}
        <Center my="10">
          <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
            {hasNextPage ? "Load More" : "No more to load"}
          </Button>
        </Center>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Something bad happened</div>;
};
