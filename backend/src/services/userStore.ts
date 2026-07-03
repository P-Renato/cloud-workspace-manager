export type User = {
  id: string;
  email: string;
  passwordHash: string;
};

const users: User[] = [];

export function findUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export function createUser(user: User) {
  users.push(user);
  return user;
}