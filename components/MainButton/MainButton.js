import * as Styled from './MainButton.styled';

export const MainButton = ({ buttonText, onPress, isActive = true }) => {
  return (
    <Styled.Button
      activeOpacity={isActive ? 0.6 : 1}
      onPress={isActive ? onPress : null}
      isActive={isActive}
    >
      <Styled.ButtonText isActive={isActive}>{buttonText}</Styled.ButtonText>
    </Styled.Button>
  );
};
