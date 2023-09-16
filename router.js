import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  LoginScreen,
  RegistrationScreen,
  CommentsScreen,
  HomeTabNavigator,
} from './Screens';

import { MainHeader } from './components/MainHeader';
import { FocusAwareStatusBar } from './components/FocusAwareStatusBar/FocusAwareStatusBar';

const isPlatformIos = Platform.OS === 'ios';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const useRoute = (isAuth, setIsAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Login">
          {(props) => <LoginScreen {...props} setIsAuth={setIsAuth} />}
        </AuthStack.Screen>
        <AuthStack.Screen name="Registration">
          {(props) => <RegistrationScreen {...props} setIsAuth={setIsAuth} />}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    );
  }
  return (
    <>
      {isPlatformIos && <FocusAwareStatusBar barStyle="dark-content" />}
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="Home">
          {(props) => <HomeTabNavigator {...props} setIsAuth={setIsAuth} />}
        </MainStack.Screen>
        <MainStack.Screen
          options={{
            headerShown: true,
            tabBarVisible: false,
            headerTitle: 'Comments',
            headerStyle: { height: 88 },
            header: (props) => {
              return <MainHeader {...props} setIsAuth={setIsAuth} />;
            },
          }}
          name="Comments"
          component={CommentsScreen}
        />
      </MainStack.Navigator>
    </>
  );
};
