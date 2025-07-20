export type TResponse<T> = TSuccessResponse<T> | TFailureResponse;

export type TSuccessResponse<T> = {
  data: T;
  error: null;
};

export type TFailureResponse = {
  data: null;
  error: string;
};
