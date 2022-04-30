export interface Game {
  id: string;
  link: string;
  image: string;
  title: string;
  price: number;
  tags: string[];
  platforms: string[];
  genre: string;
}

export type PaginatedGamesResponse = {
  games: Game[];
  nextPage: number;
};
