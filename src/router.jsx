import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Dashboard from "./pages/Dashboard";

import Stuff from "./pages/stuff/Index";
import StuffCreate from "./pages/stuff/Create";
import StuffEdit from "./pages/stuff/Edit";
import StuffTrash from "./pages/trash/IStuff";

import Stock from "./pages/stock/IndexStock";
import StockCreate from "./pages/stock/CreateStock";
import StockEdit from "./pages/stock/EditStock";
import StockTrash from "./pages/trash/IStock";

import Inbound from "./pages/inbound/IndexInbound";
import InboundCreate from "./pages/inbound/CreateInbound";
import InboundTrash from "./pages/trash/IInbound";

import User from "./pages/user/IndexUser";
import UserCreate from "./pages/user/CreateUser";
import UserEdit from "./pages/user/EditUser";
import UserTrash from "./pages/trash/IUser";

import Lending from "./pages/lending/IndexLending";
import LendingCreate from "./pages/lending/CreateLending";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },

    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> },
    { path: '/stuff/trash', element: <StuffTrash /> },

    { path: '/stock', element: <Stock /> },
    { path: '/stock/create', element: <StockCreate /> },
    { path: '/stock/edit/:id', element: <StockEdit /> },
    { path: '/stock/trash', element: <StockTrash /> },

    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/tambah', element: <InboundCreate /> },
    { path: '/InboundStuff/trash', element: <InboundTrash /> },

    { path: '/user', element: <User /> },
    { path: '/user/create', element: <UserCreate /> },
    { path: '/user/edit/:id', element: <UserEdit /> },
    { path: '/user/trash', element: <UserTrash /> },

    { path: '/lending', element: <Lending /> },
    { path: '/lending/create', element: <LendingCreate /> },
    
])