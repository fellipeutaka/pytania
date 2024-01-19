import redaxios from "redaxios";

export const api = redaxios.create();

export type ApiError = {
  type: string;
  url: string;
  redirected: boolean;
  status: number;
  ok: boolean;
  statusText: string;
  headers: object;
  body: object;
  bodyUsed: boolean;
  data: object;
};
