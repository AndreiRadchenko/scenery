// import React from 'react';
import { TouchableOpacity } from 'react-native';

export const TabBarScreenOptions = ({ route, navigation }) => ({
  tabBarShowLabel: false,
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
  tabBarActiveBackgroundColor: 'tomato',
  tabBarInactiveBackgroundColor: 'transparent',

  tabBarStyle: {
    display: 'flex',
    gap: 31,
    height: 83,
    backgroundColor: 'white',
    borderTopWidth: 0.2,
    borderTopColor: 'rgba(33, 33, 33, 0.8)',
    paddingTop: 8,
  },
  tabBarButton: (props) => {
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.8}
        style={{
          width: 70,
          height: 40,
          backgroundColor:
            props.accessibilityState.selected === true
              ? 'rgba(255, 108, 0, 1)'
              : ' white',
          borderRadius: 20,
        }}
      />
    );
  },
});
