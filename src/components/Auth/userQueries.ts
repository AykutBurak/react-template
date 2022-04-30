import { useQuery } from "react-query";
import { http } from "common/http";
import { UserResponse } from "./auth.types";

function getCurrentUser() {
  return http.get<unknown, UserResponse>("/user");
}

export const CURRENT_USER_QUERY_KEY = "currentUser";

export function useCurrentUser() {
  return useQuery(CURRENT_USER_QUERY_KEY, getCurrentUser);
}
