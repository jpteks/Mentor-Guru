export interface usersType {
  _id: string;

  email: string;

  role: string;

  subscription: string;

  plan: {
    packageName: string;
  };

  password: string;

  username: string;

  phoneNumber: string;

  region: string;
}
