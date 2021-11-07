import { ActionType, UserActions } from "../Actions";
import { UserState } from "../UserContext";

function appReducer(state: UserState, action: UserActions): UserState {
    switch (action.type) {
        case ActionType.login:
            return {
                ...state,
                isAuth: true,
                ...action.payload,
            };

        default:
            return state;
    }
}

export default appReducer;
