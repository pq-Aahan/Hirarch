import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ControlPanel from './components/ControlPanel';
import AdminPanel from './components/AdminPanel';
import GetUsers from './components/GetUsers';
import UserEdit from './components/UserEdit';
import SelectLogin from "./components/SelectLogin"; 


const isAuthenticated = () => {
  return !!localStorage.getItem("userPassword"); // Ensure password is stored after login
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/ControlPanel",
    element: <ProtectedRoute element={<ControlPanel />} />,
  },
  {
    path: "/AdminPanel",
    element: <ProtectedRoute element={<AdminPanel />} />,
  },
  {
    path: "/GetUsers",
    element: <ProtectedRoute element={<GetUsers />} />,
  },
  {
    path: "/UserEdit",
    element: <ProtectedRoute element={<UserEdit />} />,
  },
  {
    path:"/selectlogin",
    element: <ProtectedRoute element={<SelectLogin />} />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
