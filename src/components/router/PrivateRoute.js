import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN, HOME, DETALLEPACIENTE } from '../../config/routes/paths';
import { useAuthContext } from '../../contexts/authContext';

export default function PrivateRoute() {
    const { isAuthenticated } = useAuthContext();
    if (!isAuthenticated) {
        return <Navigate to={HOME} />

    }
    return (
        <div>
            <Outlet  />
        </div>
    )

}