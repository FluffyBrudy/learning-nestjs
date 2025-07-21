import { InternalServerErrorException } from '@nestjs/common';
import { RouteDefinition, UnitRouteDefinition } from 'src/types/shared.types';

function constructUrl(protocol: string, host: string, route: string) {
  if (!protocol || !host)
    return new InternalServerErrorException({ error: 'invalid url served' });
  return `${protocol}://${host}/${route.replace(/^\/|\/$/g, '')}`;
}

function flattenRoute(routeObj: RouteDefinition) {
  const baseRoute = routeObj.route;

  const routes: UnitRouteDefinition[] = [];
  routes.push({
    url: baseRoute.url,
    method: baseRoute.method,
  });
  if (!baseRoute.subroute) return routes;

  for (const v of Object.values(baseRoute.subroute)) {
    for (const sv of Object.values(v)) {
      const url = baseRoute.url + '/' + sv.url;
      const method = sv.method;
      routes.push({ url, method });
    }
  }

  return routes;
}

export function constructUrlFromRouteDefination(
  protocal: string,
  host: string,
  routeObj: RouteDefinition,
) {
  const flattedRoutes = flattenRoute(routeObj);
  return flattedRoutes.map((route) => constructUrl(protocal, host, route.url));
}
