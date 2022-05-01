import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { ChakraProvider, Progress } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LoginLayout } from "components/Layout/LoginLayout";
import { RequireAuth } from "components/Auth/RequireAuth";
import { AppLayout } from "components/Layout/AppLayout";
import { ReactQueryDevtools } from "react-query/devtools";

const Games = React.lazy(() => import("pages/Games"));
const GameDetail = React.lazy(() => import("pages/Games/_id"));

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
            path="/games"
            element={
              <RequireAuth>
                <AppLayout>
                  <React.Suspense fallback={<Progress isIndeterminate />}>
                    <Games />
                  </React.Suspense>
                </AppLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/games/:id"
            element={
              <RequireAuth>
                <AppLayout>
                  <React.Suspense fallback={<Progress isIndeterminate />}>
                    <GameDetail />
                  </React.Suspense>
                </AppLayout>
              </RequireAuth>
            }
          />
          {/* Navigate to games when no match */}
          <Route path="*" element={<Navigate to="/games" />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
