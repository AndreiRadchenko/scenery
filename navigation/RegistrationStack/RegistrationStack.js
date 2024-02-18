import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RegistrationScreen } from '../screens/auth/RegistrationScreen';
import { CameraScreen } from '../screens/main/CameraScreen';

import { SCREEN, STACK } from '../constants';

const Create = createStackNavigator();

export const RegistrationStack = () => {
  return (
    <Create.Navigator>
      <Create.Screen
        options={{ headerShown: false }}
        name={SCREEN.AUTH.REGISTRATION}
        // component={RegistrationScreen}
      >
        {(props) => <RegistrationScreen {...props} />}
      </Create.Screen>
      <Create.Screen
        options={{ headerShown: false }}
        name={SCREEN.MAIN.CAMERA}
        // component={CameraScreen}
      >
        {(props) => <CameraScreen {...props} />}
      </Create.Screen>
    </Create.Navigator>
  );
};
