import React from "react";
import "App.css";
import { PathRouteProps, Route, Routes } from "react-router-dom";
import { Login } from "pages/Login";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LoginLayout } from "components/Layout/LoginLayout";
import { RequireAuth } from "components/Auth/RequireAuth";
import { AppLayout } from "components/Layout/AppLayout";
import { Home } from "pages/Home";

const queryClient = new QueryClient();

const AuthRequiredRoute: React.FC<PathRouteProps> = ({ children, ...rest }) => (
  <Route {...rest} element={<RequireAuth>{children}</RequireAuth>} />
);

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
          <AuthRequiredRoute path="/">
            <AppLayout>
              <Home />
            </AppLayout>
          </AuthRequiredRoute>
        </Routes>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
