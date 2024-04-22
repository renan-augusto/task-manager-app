import { IBaseUser } from "./base-user.interface";

export interface IUserRequest extends IBaseUser {
    firstName: string;
    lastName: string
}