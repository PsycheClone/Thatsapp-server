import {loginUserAction} from "./app_contents/controller/loginUserAction";
import {registerUserAction} from "./app_contents/controller/registerUserAction";

export const AppRoutes = [
    {
        path: "/auth/register",
        method: "post",
        action: registerUserAction
    },
    {
        path: "/auth/login",
        method: "post",
        action: loginUserAction
    }
];
