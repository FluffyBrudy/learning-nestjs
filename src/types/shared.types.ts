export type TResponse<T> = TSuccessResponse<T> | TFailureResponse;

export type TSuccessResponse<T> = {
  data: T;
  error: null;
};

export type TFailureResponse = {
  data: null;
  error: string;
};

export type UnitRouteDefinition = {
  url: string;
  method: string;
};

export type RouteDefinition = {
  route: UnitRouteDefinition & {
    subroute: {
      [subrouteKey: string]: {
        [subKey: string]: UnitRouteDefinition;
      };
    };
  };
};
