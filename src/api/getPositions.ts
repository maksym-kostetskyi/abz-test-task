import { PositionsApiResponse } from "../types/Position";

const getPositions = async (): Promise<PositionsApiResponse> => {
  const response = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch positions");
  }
  const data: PositionsApiResponse = await response.json();
  return data;
};

export default getPositions;
