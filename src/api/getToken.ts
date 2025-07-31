import { TokenApiResponse } from "../types/PostUser";

const getToken = async (): Promise<string> => {
  const response = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/token"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }
  const data: TokenApiResponse = await response.json();
  return data.token;
};

export default getToken;
