import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PostsScreen, CreateScreen, ProfileScreen } from '../../../Screens';

import {
  PostsSvg,
  CreateSvg,
  ProfileSvg,
  BottomTabBar,
} from '../../components/BottomTabNavigator';
import { MainHeader } from '../../components/MainHeader';

const HomeTab = createBottomTabNavigator();

export const HomeTabNavigator = ({ setIsAuth }) => {
  return (
    <HomeTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <HomeTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <PostsSvg size={size} color={color} />
          ),
          headerStyle: { height: 88 },
          header: (props) => {
            return <MainHeader {...props} setIsAuth={setIsAuth} />;
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <HomeTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <CreateSvg size={size} color={color} />
          ),
          headerShown: true,
          tabBarVisible: false,
          headerTitle: 'Create Post',
          headerStyle: { height: 88 },
          header: (props) => {
            return <MainHeader {...props} setIsAuth={setIsAuth} />;
          },
        }}
        name="Create"
        component={CreateScreen}
      />
      <HomeTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ProfileSvg size={size} color={color} />
          ),
          headerShown: false,
        }}
        name="Profile"
      >
        {(props) => <ProfileScreen {...props} setIsAuth={setIsAuth} />}
      </HomeTab.Screen>
    </HomeTab.Navigator>
  );
};
