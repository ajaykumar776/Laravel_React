import { useLocation } from "react-router-dom";
import LoginComponent from "../components/auth/LoginComponent";
import AuthLayout from "../layouts/AuthLayout";
import RegisterComponent from "../components/auth/RegisterComponent";

const AuthPage = () => {
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[1];
    console.log(currentLocation);
    const componentMapping = {
        login: LoginComponent,
        register: RegisterComponent,
    };
    const MyComponent = componentMapping[currentLocation];

    return (
        <AuthLayout>
            <MyComponent />
        </AuthLayout>
    );
}
export default AuthPage;