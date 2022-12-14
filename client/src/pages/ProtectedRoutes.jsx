import { Navigate, Outlet } from 'react-router'
import Login from './Login';
import { Layout } from 'antd';
import Auth from '../utils/auth';

// const useAuth = () => {
//     const user = { loggedIn: false }
//     return user && user.loggedIn;
// }

const ProtectedRoutes = () => {
    // const isAuth = useAuth();
    return <Layout>
                {Auth.loggedIn() ? 
                <Outlet />
                 : <Navigate to="/"/>}
            </Layout>
};

export default ProtectedRoutes;