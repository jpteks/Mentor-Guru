export interface subscribersType {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
  };
  payment: {
    _id: string;
    amount: string;
    status: string;
    paymentMethod: string;
    paymentDate: string;
  };
  plan: {
    _id: string;
    packageName: string;
  };
}

/*

[
  {
    _id: '6731343073522b95bb37cf34',
    user: {
      _id: '6731342f73522b95bb37cf32',
      email: 'valentinpola7@gmail.com',
      username: 'Pola',
      phoneNumber: '651118070'
    },
    plan: {
      _id: '672e96f5c652b387478b807f',
      packageName: 'Free',
      accessToPastPapers: true,
      accessToPdfSolutions: true,
      accessToRestrictedVideos: true,
      accessToVideoSolutions: false,
      downloadablePapers: false,
      accessToAllCourses: false,
      downloadableAnswers: false,
      downloadableVideos: false,
      __v: 0
    },
    payment: {
      _id: '67324481f5479449dd7281cb',
      amount: 0,
      status: 'completed',
      paymentMethod: 'cash',
      paymentDate: '2024-11-11T16:53:05.000Z'
    },
    subscriptionDate: '2024-11-11T16:49:47.000Z',
    expirationDate: null,
    createdAt: '2024-11-10T22:31:12.738Z',
    updatedAt: '2024-11-11T17:53:09.670Z',
    __v: 0
  },
  {
    _id: '6734c31d273f8db9ba1253d0',
    user: {
      _id: '6734c31d273f8db9ba1253ce',
      email: 'rubenloic8@gmail.com',
      username: 'doe',
      phoneNumber: '677062270'
    },
    plan: {
      _id: '672e96f5c652b387478b807f',
      packageName: 'Free',
      accessToPastPapers: true,
      accessToPdfSolutions: true,
      accessToRestrictedVideos: true,
      accessToVideoSolutions: false,
      downloadablePapers: false,
      accessToAllCourses: false,
      downloadableAnswers: false,
      downloadableVideos: false,
      __v: 0
    },
    payment: {
      _id: '6734c31e273f8db9ba1253d3',
      amount: 0,
      status: 'completed',
      paymentMethod: 'cash',
      paymentDate: '2024-11-13T00:00:00.000Z'
    },
    subscriptionDate: '2024-11-13T00:00:00.000Z',
    expirationDate: null,
    createdAt: '2024-11-13T15:17:49.640Z',
    updatedAt: '2024-11-13T15:17:50.528Z',
    __v: 0
  }
]
  */
