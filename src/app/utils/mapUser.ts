import { User } from '../interface/user.interface';

export function pickUser(user: any): User {
  const {
    id,
    name,
    username,
    email,
    address: { street, city, zipcode },
  } = user;

  return {
    id,
    name,
    username,
    email,
    address: { street, city, zipcode },
  };
}
