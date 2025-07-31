import { UsersApiResponse } from "../types/UsersApiResponse";

const getUsers = async (
  page: number,
  count: number
): Promise<UsersApiResponse> => {
  const response = await fetch(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data: UsersApiResponse = await response.json();
  return data;
};

export default getUsers;
