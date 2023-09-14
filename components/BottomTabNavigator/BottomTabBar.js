import * as React from 'react';

import * as Styled from './BottomTabBar.styled';
import themes from '../../utils/themes';

const noTabBarScreens = ['Create', 'Comments'];

export function BottomTabBar({ state, descriptors, navigation }) {
  const currentScreen = state.routes[state.index].name;
  const isTabBarVisible = !noTabBarScreens.includes(currentScreen);
  let buttonTabArray = state.routes.slice(0, 3);
  if (state.index === 2) {
    const lastButtons = buttonTabArray.slice(1, 3);
    buttonTabArray = [buttonTabArray[0], ...lastButtons.reverse()];
  }
  return (
    isTabBarVisible && (
      <Styled.TabBar tabIndex={state.index}>
        {buttonTabArray.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const isCentralButton = index === 1;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!event.defaultPrevented) {
              navigation.navigate(route.name, { prevScreen: currentScreen });
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
              isFocused={isCentralButton}
            >
              {options.tabBarIcon({
                color: isCentralButton
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
