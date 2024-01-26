import { IRole } from "./Role";

export interface IUser {
  id: string;
  username: string;
  fullname: string;
  email: string;
  roles: IRole[];
  token: string;
  active: boolean;
}
