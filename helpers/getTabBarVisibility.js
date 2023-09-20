import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SCREEN, STACK } from '../navigation/constants';

const noTabBarScreens = [
  STACK.CREATE_POST,
  SCREEN.MAIN.CREATE_POST,
  SCREEN.MAIN.COMMENTS,
  SCREEN.MAIN.CAMERA,
  SCREEN.MAIN.MAP,
];

const noMainHeaderScreens = [SCREEN.MAIN.CAMERA];

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
