import { IRole } from "./Role";

export interface IAuth {
  id: string;
  username: string;
  fullname: string;
  email: string;
  roles: IRole[];
  token: string;
}
