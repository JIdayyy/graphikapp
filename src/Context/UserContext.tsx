import { createContext, Dispatch, useReducer } from "react";
import { UserActions } from "@Context/Actions";
import appReducer from "@Context/reducers/reducer";

export type IUser = {
    id: string;
    name: string;
    email: string;
};

export interface UserState {
    isAuth?: boolean;
    user: IUser;
}

export const AppContextDefault: UserState = {
    isAuth: false,
    user: {
        id: "350d14fd-5dbe-4362-a1c4-3abf4637ba75",
        name: "Julien",
        email: "julien_abbadie@hotmail.fr",
    },
};

export const UserContext = createContext<{
    state: UserState;
    dispatch: Dispatch<UserActions>;
}>({
    state: AppContextDefault,
    dispatch: () => null,
});

export const UserContextProvider = ({
    children,
}: {
    children: JSX.Element;
}): JSX.Element => {
    const [state, dispatch] = useReducer(appReducer, AppContextDefault);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
