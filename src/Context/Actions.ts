import { IUser } from "@Context/UserContext";

export enum ActionType {
    login,
}

export interface SetUserState {
    type: ActionType.login;
    payload: IUser;
}

export type UserActions = SetUserState;
