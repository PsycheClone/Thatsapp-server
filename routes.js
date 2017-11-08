import {loginUserAction} from "./app_contents/controller/loginUserAction";
import {registerUserAction} from "./app_contents/controller/registerUserAction";

export const AppRoutes = [
    {
        path: "/register",
        method: "post",
        action: registerUserAction
    },
    {
        path: "/login",
        method: "post",
        action: loginUserAction
    }
];
