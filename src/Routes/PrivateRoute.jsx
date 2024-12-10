
import { useContext } from "react";
import { AuthContext } from "../Components/Pages/Authentication/Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user,loading} =useContext(AuthContext)
  
    if(user){
        return children;
    }

    return <Navigate to='/teacher_login'></Navigate>
        
    
};


export default PrivateRoute;

