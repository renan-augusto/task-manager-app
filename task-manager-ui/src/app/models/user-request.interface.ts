import { BaseUser } from "./base-user.interface";

export interface UserRequest extends BaseUser{
    firstName: string;
    lastName: string
}