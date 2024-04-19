import * as Styled from './MainButton.styled';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import themes from '../../utils/themes';

export const MainButton = ({ buttonText, onPress, isActive = true }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isActive
            ? themes.primary.colors.accentColor
            : themes.primary.colors.inputBgColor,
        },
      ]}
      activeOpacity={isActive ? 0.6 : 1}
      onPress={isActive ? onPress : null}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: isActive
              ? themes.primary.colors.backgroundColor
              : themes.primary.colors.lightGrey,
          },
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 100,
  },
  buttonText: {},
});
