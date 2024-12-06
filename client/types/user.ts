export interface usersType {
  _id: string;

  email: string;

  role: string;

  bio: string;

  avatarUrl: string;

  subscription: string;

  plan: {
    packageName: string;
  };

  password: string;

  username: string;

  phoneNumber: string;

  region: string;
}

/**
 * 
 * {
  _id: '674f593c62b77b1ab181f761',
  email: 'yvesnyemb7@gmail.com',
  subscription: '674f593d62b77b1ab181f763',
  plan: { _id: '672e96f5c652b387478b807f', packageName: 'Free' },
  password: '$2b$10$Y31p1MErkoQabBe0xkY7c.lArWqK3mXC8xdi7aCiYtMQns.CKGqWG',
  username: 'Loic Ruben',
  phoneNumber: '679845608',
  region: 'Littoral',
  isEmailVerified: true,
  accountStatus: 'active',
  otp: null,
  otpExpiry: null,
  role: 'student',
  createdAt: '2024-12-03T19:17:16.874Z',
  updatedAt: '2024-12-03T19:19:32.787Z',
  __v: 0
}
 */
