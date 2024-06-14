import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {StoreProvider} from "./Store.jsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage.jsx";
import {RegisterPage} from "./pages/RegisterPage.jsx";



import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import CoursesPage from "./pages/CoursesPage.jsx";
import CourseDetailsPage1 from "./pages/CourseDetailsPage1.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import {UserDetailsPage} from "./pages/UserDetailsPage.jsx";
import ProtectedRoute from "./routeGuards /AdminRoute.jsx";
import AdminRoute from "./routeGuards /AdminRoute.jsx";





const queryClient = new QueryClient();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/:studentId/:courseId" element={<CourseDetailsPage1 />} />
            </Route>

            <Route element={<AdminRoute />}>
                <Route path="admin/users" element={<UsersPage />} />
                <Route path="admin/users/:studentId" element={<UserDetailsPage />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StoreProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StoreProvider>
    </React.StrictMode>,
)
