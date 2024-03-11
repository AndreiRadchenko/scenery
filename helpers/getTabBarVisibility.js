import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SCREEN, STACK } from '../navigation/constants';

const noTabBarScreens = [
  STACK.CREATE_POST,
  SCREEN.MAIN.CREATE_POST,
  SCREEN.MAIN.COMMENTS,
  SCREEN.MAIN.MAP,
  SCREEN.MAIN.PREVIEW,
];

const noMainHeaderScreens = [SCREEN.MAIN.PREVIEW];

export const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
  const displayOption = noTabBarScreens.includes(routeName) ? 'none' : 'flex';
  return displayOption;
};

export const getMainHeaderVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
  const displayOption = noMainHeaderScreens.includes(routeName)
    ? 'none'
    : 'flex';
  return displayOption;
};
