import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { SCREEN, STACK } from '../navigation/constants';

export const getHeaderLabel = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

  let label = '';

  switch (routeName) {
    case STACK.HOME:
    case SCREEN.MAIN.POSTS:
      label = 'Posts';
      break;
    case STACK.CREATE_POST:
    case SCREEN.MAIN.CREATE_POST:
      label = 'Create Post';
      break;
    case STACK.PROFILE:
    case SCREEN.MAIN.PROFILE:
      label = 'Profile';
      break;
    case SCREEN.MAIN.COMMENTS:
      label = 'Comments';
      break;
    case SCREEN.MAIN.CAMERA:
      label = 'Take Photo';
      break;
    case SCREEN.MAIN.MAP:
      label = 'Location';
      break;
  }

  return label;
};
