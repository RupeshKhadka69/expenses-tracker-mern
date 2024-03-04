import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react'
import Register from './pages/Register';
import Login from './pages/SignIn';
import HeroPage from './components/HeroPage';
import Income from './income/PersonIncome';
import Expense from './expenses/PersonExpense';
import DashBoard from './dashboard/DashBoard';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient(

);

// Use createRoot instead of ReactDOM.render

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HeroPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/profile" element={<Profile />}></Route>

      {/* Private Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/income" element={<Income />}></Route>
        <Route path="/expense" element={<Expense />}></Route>
      <Route path="/dashboard" element={<DashBoard />}></Route>
      </Route>
    
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider  client={queryClient}>
    <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
    </React.StrictMode>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
);