import {loginUserAction} from "./app_contents/controller/loginUserAction";
import {registerUserAction} from "./app_contents/controller/registerUserAction";
import {addContactAction} from "./app_contents/controller/addContactAction";
import {getContactAction} from "./app_contents/controller/getContactsAction";

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
    },
    {
        path: "/add/contact",
        method: "post",
        action: addContactAction
    },
    {
        path: "/get/contact/:userId?",
        method: "get",
        action: getContactAction
    }
];
