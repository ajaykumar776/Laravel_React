import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import LogoutComponent from '../components/auth/LogoutComponent';

const PrivateRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem('authToken');
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return element;
};
const NonPrivateRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem('authToken');
    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }
    return element;
};

const routes = (
    <Routes>
        <Route path="/login" element={<NonPrivateRoute element={<AuthPage />} />} />
        <Route path="/forgotpassword" element={<NonPrivateRoute element={<AuthPage />} />} />
        <Route path="/register" element={<NonPrivateRoute element={<AuthPage />} />} />

        <Route
            path="/"
            element={<PrivateRoute element={<DashboardPage />} />}
        >
            {/* Your other routes */}
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/category" element={<DashboardPage />} />
            <Route path="/categoryadd" element={<DashboardPage />} />
            <Route path="/editcategory/:id" element={<DashboardPage />} />

            <Route path="/subcategory" element={<DashboardPage />} />
            <Route path="/subcategoryadd" element={<DashboardPage />} />
            <Route path="/editsubcategory/:id" element={<DashboardPage />} />

            <Route path="/users" element={<DashboardPage />} />
            <Route path="/userEdit/:id" element={<DashboardPage />} />

            <Route path="/profile" element={<DashboardPage />} />
            <Route path="/logout" element={<LogoutComponent />} />

            {/* ... */}
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
);

export default routes;
