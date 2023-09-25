import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PostsScreen } from '../screens/main/PostsScreen/Posts';
import { CommentsScreen } from '../screens/main/CommentsScreen';
import { MapScreen } from '../screens/main/MapScreen';

import { SCREEN, STACK } from '../constants';

const Home = createStackNavigator();

export const HomeStack = () => {
  return (
    <Home.Navigator initialRouteName={SCREEN.MAIN.POSTS}>
      <Home.Screen
        options={{ headerShown: false }}
        name={SCREEN.MAIN.POSTS}
        component={PostsScreen}
      />
      <Home.Screen
        options={{ headerShown: false }}
        name={SCREEN.MAIN.COMMENTS}
        component={CommentsScreen}
      />
      <Home.Screen
        options={{ headerShown: false }}
        name={SCREEN.MAIN.MAP}
        component={MapScreen}
      />
    </Home.Navigator>
  );
};
