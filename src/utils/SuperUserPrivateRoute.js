
import { Outlet, Navigate } from 'react-router-dom'


const SuperUserPrivateRoute = () => {

    let auth = { 'token': localStorage.getItem('super-secret-key') }
    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />

    )
}

export default SuperUserPrivateRoute;