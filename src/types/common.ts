export interface Genre {
  id: number;
  name: string;
}

export interface SearchArgs {
  query: string;
  page?: number;
}