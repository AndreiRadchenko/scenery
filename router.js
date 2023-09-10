import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  LoginScreen,
  RegistrationScreen,
  PostsScreen,
  CreateScreen,
  ProfileScreen,
  CommentsScreen,
} from './Screens';

import {
  PostsSvg,
  CreateSvg,
  ProfileSvg,
  BottomTabBar,
} from './components/BottomTabNavigator';
import { MainHeader } from './components/MainHeader';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

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
    <MainTab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerStyle: { height: 88 },
        header: (props) => {
          return <MainHeader {...props} setIsAuth={setIsAuth} />;
        },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <PostsSvg size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <CreateSvg size={size} color={color} />
          ),
          headerTitle: 'Create post',
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ProfileSvg size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
      {/* <MainTab.Screen
        options={{
          tabBarVisible: false,
        }}
        name="Comments"
        component={CommentsScreen}
      /> */}
    </MainTab.Navigator>
  );
};
