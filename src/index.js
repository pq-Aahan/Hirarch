import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import ControlPanel from './components/ControlPanel';
import AdminPanel from './components/AdminPanel';
import GetUsers from './components/GetUsers';
import UserEdit from './components/UserEdit';

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
    element: <ControlPanel />,
  },{
    path: "/AdminPanel",
    element: <AdminPanel />,
  },
  {
    path: "/GetUsers",
    element: <GetUsers />,
  },  {
    path: "/UserEdit",
    element: <UserEdit />,
  },
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
