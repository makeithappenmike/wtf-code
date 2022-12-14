import { Navigate, Outlet } from 'react-router'
import { Layout } from 'antd';
import Auth from '../utils/auth';

const ProtectedRoutes = () => {
    return <Layout>
                {Auth.loggedIn() ? 
                <Outlet />
                 : <Navigate to="/"/>}
            </Layout>
};

export default ProtectedRoutes;