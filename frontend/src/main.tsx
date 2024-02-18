import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { QueryClientProvider,QueryClient} from 'react-query';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/SignIn';
import { AuthProvider } from './context/AuthContext';
import HeroPage from './components/HeroPage';
import Income from './income/PersonIncome';
import PrivateRoute from './components/PrivateRoute';
const queryClient = new QueryClient(
  
);

// Use createRoot instead of ReactDOM.render

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} >
              <Route index={true} path='/' element={<HeroPage />}></Route>
              <Route path="/register" element={<Register />} ></Route>
              <Route path="/login" element={<Login />} ></Route>
             <Route path='' element={<PrivateRoute/>}>
              <Route path="/income" element={<Income />} ></Route>

             </Route>

            </Route>

            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
