import * as React from 'react';

import * as Styled from './BottomTabBar.styled';
import themes from '../../utils/themes';

export function BottomTabBar({ state, descriptors, navigation }) {
  return (
    state.index !== 1 && (
      <Styled.TabBar tabIndex={state.index}>
        {state.routes.slice(0, 3).map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Styled.TabBarButton
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
            >
              {options.tabBarIcon({
                color: isFocused
                  ? themes.primary.colors.iconActive
                  : themes.primary.colors.iconInactive,
                size: 24,
              })}
            </Styled.TabBarButton>
          );
        })}
      </Styled.TabBar>
    )
  );
}
