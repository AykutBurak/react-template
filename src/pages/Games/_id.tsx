import { Center } from "@chakra-ui/react";
import { GameCard } from "components/Games/GameCard";
import { useGame } from "components/Games/gamesQueries";
import React from "react";
import { useParams } from "react-router-dom";

const GameDetail: React.FC<Record<string, never>> = () => {
  const { id } = useParams<"id">();
  const { data, isError, isLoading } = useGame(id!);

  if (!id || isError) {
    return <div>Game not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Center>{data && <GameCard {...data!} />}</Center>;
};

export default GameDetail;
