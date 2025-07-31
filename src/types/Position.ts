export interface Position {
  id: number;
  name: string;
}

export interface PositionsApiResponse {
  success: boolean;
  positions: Position[];
}
