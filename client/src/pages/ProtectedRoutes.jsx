import { Navigate, Outlet } from 'react-router'
import { Layout } from 'antd';
import Auth from '../utils/auth';

// If the User is not logged in, we hide specific Routes from them (see: App.jsx)
const ProtectedRoutes = () => {
    return <Layout>
                {Auth.loggedIn() ? 
                <Outlet />
                 : <Navigate to='/'/>}
            </Layout>
};

export default ProtectedRoutes;