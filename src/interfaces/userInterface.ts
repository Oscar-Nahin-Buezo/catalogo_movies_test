export interface IUserReducer {
  user: IUser | null;
  token: string | null;
}

export interface IUser {
  name: string;
  email: string;
  cellphone: string;
  dni: string;
  address: string;
}

export interface ILoginUser {
  cellPhone: string;
  password: string;
}
