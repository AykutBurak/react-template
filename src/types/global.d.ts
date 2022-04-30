import { Location } from "react-router-dom";

export type VoidFunction = () => void;

export type LocationWithState = Location & {
  state?: {
    from?: {
      pathname: string;
    };
  };
};
