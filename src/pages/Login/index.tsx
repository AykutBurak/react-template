import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "components/Auth/authQueries";
import { LoginInput } from "components/Auth/auth.types";

export const Login: React.FC<Record<string, never>> = () => {
  const loginMutation = useLoginMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInput>();

  const login: SubmitHandler<LoginInput> = (values) => {
    return loginMutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <FormControl mb="3" isInvalid={!!errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          {...register("username", {
            required: "Please enter your username",
          })}
        />
        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>

      <FormControl mb="6" isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "Please enter your password",
          })}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <Button
        w="lg"
        isDisabled={loginMutation.isLoading}
        isLoading={loginMutation.isLoading}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};
