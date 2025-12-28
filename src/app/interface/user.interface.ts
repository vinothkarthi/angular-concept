export interface userInterface {
  personalDetail: personalDetail[];
  post: posts[];
}

export interface personalDetail {
  id: string;
  name: string;
  email: string;
}

export interface posts {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}
