import { matchPath } from 'react-router';

export function getMatch(map, pathname, execute) {
  const result = Object.entries(map).find(([route]) => matchPath(pathname, route));
  return result && result[1];
}
