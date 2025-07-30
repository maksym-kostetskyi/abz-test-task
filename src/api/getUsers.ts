import { User } from "../types/User";

const getUsers = async (page: number, count: number): Promise<User[]> => {
  const response = await fetch(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data.users;
};

export default getUsers;
