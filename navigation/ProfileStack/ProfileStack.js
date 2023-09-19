import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileScreen } from '../screens/main/ProfileScreen';
import { CommentsScreen } from '../screens/main/CommentsScreen';
import { MainHeader } from '../../components/MainHeader';

import { SCREEN, STACK } from '../constants';

const Profile = createStackNavigator();

export const ProfileStack = ({ setIsAuth }) => {
  return (
    <Profile.Navigator>
      <Profile.Screen
        options={{ headerShown: false }}
        name={SCREEN.MAIN.PROFILE}
      >
        {(props) => <ProfileScreen {...props} setIsAuth={setIsAuth} />}
      </Profile.Screen>
      <Profile.Screen
        options={{
          headerStyle: { height: 88 },
          header: (props) => {
            return <MainHeader {...props} setIsAuth={setIsAuth} />;
          },
        }}
        name={SCREEN.MAIN.COMMENTS}
        component={CommentsScreen}
      />
    </Profile.Navigator>
  );
};
