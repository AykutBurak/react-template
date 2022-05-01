import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes } from "react-router-dom";
import { InitialEntry } from "history";

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
  otherRoute?: React.ReactElement | null,
  initialEntries?: InitialEntry[]
) {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <MemoryRouter initialEntries={initialEntries}>
          {ui}
          <Routes>{otherRoute}</Routes>
        </MemoryRouter>
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
