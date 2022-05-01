import { Center, Skeleton } from "@chakra-ui/react";
import { GameCard } from "components/Games/GameCard";
import { useGame } from "components/Games/gamesQueries";
import React from "react";
import { useParams } from "react-router-dom";

const GameDetail: React.FC<Record<string, never>> = () => {
  const { id } = useParams<"id">();
  const { data, isSuccess, isError } = useGame(id!);

  if (!id || isError) {
    return <div>Game not found</div>;
  }

  return (
    <Center>
      <Skeleton isLoaded={isSuccess}>
        {data && <GameCard {...data!} />}
      </Skeleton>
    </Center>
  );
};

export default GameDetail;
