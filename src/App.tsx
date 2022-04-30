import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LoginLayout } from "layouts/LoginLayout";
import { RequireAuth } from "components/Auth/RequireAuth";
import { AppLayout } from "layouts/AppLayout";
import { Home } from "pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginLayout>
                <Login />
              </LoginLayout>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppLayout>
                  <Home />
                </AppLayout>
              </RequireAuth>
            }
          />
        </Routes>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
