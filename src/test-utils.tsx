import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//     },
//   },
// });

// to prevent network errors from bloating the console
setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more network errors on the console
  error: () => {},
});

const AllTheProviders: FC<Record<string, any>> = ({ children }) => {
  return (
    <MemoryRouter>
      <ChakraProvider>
        {/* <QueryClientProvider client={queryClient}> */}
        {children}
        {/* </QueryClientProvider> */}
      </ChakraProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

export function renderWithClient(client: QueryClient, ui: React.ReactElement) {
  const { rerender, ...result } = customRender(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
      ),
  };
}
