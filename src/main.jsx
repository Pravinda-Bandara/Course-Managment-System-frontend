import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {StoreProvider} from "./Store.jsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage.jsx";
import {RegisterPage} from "./pages/RegisterPage.jsx";
import {StudentEnrollmentPage} from "./pages/StudentEnrollmentPage.jsx";
import {CoursesPage} from "./pages/CoursesPage.jsx";
import {StudentsPage} from "./pages/StudentsPage.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index={true} element={<LoginPage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="enrollment" element={<StudentEnrollmentPage/>}/>
            <Route path="admin/courses" element={<CoursesPage/>}/>
            <Route path="admin/students" element={<StudentsPage/>}/>
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
