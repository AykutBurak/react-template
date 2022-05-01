import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { http } from "common/http";
import { useMutation, useQueryClient } from "react-query";
import {
  ErrorType,
  LoginInput,
  LogoutResponse,
  UserResponse,
} from "./auth.types";
import { CURRENT_USER_QUERY_KEY } from "./userQueries";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationWithState } from "types/global";

function login({ username, password }: LoginInput) {
  return http.post<unknown, UserResponse>("/login", {
    username,
    password,
  });
}

function logout() {
  return http.post<unknown, LogoutResponse>("/logout");
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation() as LocationWithState;

  return useMutation(login, {
    onError(e: AxiosError<ErrorType>) {
      toast({
        title: "Could not login",
        description: e.response?.data.errorMessage,
        duration: 9000,
        isClosable: true,
        status: "error",
      });
    },
    onSuccess(user) {
      toast({
        title: "Welcome",
        description: user.username,
        duration: 3000,
        isClosable: true,
        status: "success",
      });

      // synchronously update the data and then fire a refetch to get the updated version
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
      queryClient.invalidateQueries(CURRENT_USER_QUERY_KEY);

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation(logout, {
    onError(e: AxiosError<ErrorType>) {
      toast({
        title: "Could not logout",
        description: e.response?.data.errorMessage,
        duration: 9000,
        isClosable: true,
        status: "error",
      });
    },
    onSuccess(response) {
      toast({
        title: "Goodbye",
        description: response.message,
        duration: 3000,
        isClosable: true,
        status: "success",
      });

      queryClient.invalidateQueries(CURRENT_USER_QUERY_KEY);
      navigate("/login");
    },
  });
}
