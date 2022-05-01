import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter, Routes } from "react-router-dom";

const AllTheProviders: FC<Record<string, any>> = ({ children }) => {
  return (
    <MemoryRouter>
      <ChakraProvider>{children}</ChakraProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

export function renderWithClient(
  client: QueryClient,
  ui: React.ReactElement,
  otherRoute?: React.ReactElement | null | undefined
) {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <BrowserRouter>
          {ui}
          <Routes>{otherRoute}</Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
      ),
  };
}
