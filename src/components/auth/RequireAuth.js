import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getDecodedToken } from "../../util/jwtUtil";

const RequireAuth = ({allowedRoles}) => {
  const location = useLocation();
  const tokenData = getDecodedToken();
 return (
     allowedRoles?.includes("Unauthenticated") ?
         ! tokenData
             // user is not authenticated and goes to login/register
             ? <Outlet/>
             // user is authenticated but wants to go login/register
             : <Navigate to="/landing" replace={true}/>
           : allowedRoles?.includes("Authenticated") && tokenData
                // user is authorized for requested page
             ? <Outlet/>
             : tokenData
                // user is authenticated but not authorized for requested page
                ? <Navigate to={`/unauthorized`} state={{from: location}} replace />
                // user is not authenticated
                : <Navigate to={`/login`} state={{from: location}} replace />
     );
}

export default RequireAuth;