import { DeleteSvg } from './DeleteSvg';
import * as Styled from './DeleteButton.styled';
import themes from '../../utils/themes';

export const DeleteButton = ({ isActive, onPress }) => {
  return (
    <Styled.DeleteButton
      activeOpacity={isActive ? 0.8 : 1}
      onPress={isActive ? onPress : null}
      isActive={isActive}
    >
      <DeleteSvg
        color={
          isActive
            ? themes.primary.colors.backgroundColor
            : themes.primary.colors.lightGrey
        }
      />
    </Styled.DeleteButton>
  );
};
