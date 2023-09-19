import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CreateScreen } from '../screens/main/CreatePostsScreen';
import { CameraScreen } from '../screens/main/CameraScreen';

import { SCREEN, STACK } from '../constants';

const Create = createStackNavigator();

export const CreateStack = () => {
  return (
    <Create.Navigator>
      <Create.Screen
        options={{ headerShown: false }}
        name={SCREEN.MAIN.CREATE_POST}
        component={CreateScreen}
      />
      <Create.Screen
        options={{ headerShown: false }}
        name={SCREEN.MAIN.CAMERA}
        component={CameraScreen}
      />
    </Create.Navigator>
  );
};
