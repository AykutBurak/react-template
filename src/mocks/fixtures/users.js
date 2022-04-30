import { faker } from "@faker-js/faker";

export const users = [
  {
    username: "my-user",
    password: "my-user-password",
  },
];

export function createUser(
  { username, password } = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }
) {
  const newUser = {
    username,
    password,
  };

  users.push(newUser);

  return newUser;
}

export function getUser({ username, password }) {
  console.log(users);
  console.log({ username, password });

  return users.find((u) => u.username === username && u.password === password);
}
