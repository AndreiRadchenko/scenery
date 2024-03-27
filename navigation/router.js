import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LoginScreen } from './screens/auth/LoginScreen';
import { RegistrationScreen } from './screens/auth/RegistrationScreen';
import { HomeStack } from './HomeStack';
import { CreateScreen } from './screens/main/CreatePostsScreen';
import { ProfileStack } from './ProfileStack';
import {
  PostsSvg,
  CreateSvg,
  ProfileSvg,
  BottomTabBar,
} from '../components/BottomTabNavigator';
import { MainHeader } from '../components/MainHeader';
import { FocusAwareStatusBar } from '../components/FocusAwareStatusBar/FocusAwareStatusBar';

import { SCREEN, STACK } from './constants';

const isPlatformIos = Platform.OS === 'ios';

const AuthStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

export const UseRoute = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <AuthStack.Navigator
        initialRouteName={SCREEN.AUTH.LOGIN}
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name={SCREEN.AUTH.LOGIN}>
          {(props) => <LoginScreen {...props} />}
        </AuthStack.Screen>
        <AuthStack.Screen name={STACK.REGISTRATION}>
          {(props) => <RegistrationScreen {...props} />}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    );
  }
  return (
    <>
      {isPlatformIos && <FocusAwareStatusBar barStyle="dark-content" />}
      <HomeTab.Navigator
        initialRouteName={STACK.HOME}
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        <HomeTab.Screen
          options={({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => (
              <PostsSvg size={size} color={color} />
            ),
            headerStyle: { height: 88, position: 'absolute' },
            header: (props) => {
              return <MainHeader {...props} />;
            },
          })}
          name={STACK.HOME}
        >
          {(props) => <HomeStack {...props} />}
        </HomeTab.Screen>
        <HomeTab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <CreateSvg size={size} color={color} />
            ),
            headerShown: true,
            headerTitle: 'Create Post',
            headerStyle: { height: 88 },
            header: (props) => {
              return <MainHeader {...props} />;
            },
          }}
          name={SCREEN.MAIN.CREATE_POST}
          component={CreateScreen}
        />
        <HomeTab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <ProfileSvg size={size} color={color} />
            ),
            headerShown: false,
          }}
          name={STACK.PROFILE}
        >
          {(props) => <ProfileStack {...props} />}
        </HomeTab.Screen>
      </HomeTab.Navigator>
    </>
  );
};
