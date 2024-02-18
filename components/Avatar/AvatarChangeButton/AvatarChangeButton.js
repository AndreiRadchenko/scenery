import { DeleteSvg } from './DeleteSvg';
import { AddSvg } from './AddSvg';
import * as Styled from './AvatarChangeButton.styled';
// import themes from '../../utils/themes';

export const AvatarChangeButton = ({ isAvatar, onPress }) => {
  return (
    <Styled.BackgroundWrapper>
      <Styled.AvatarChangeButton activeOpacity={0.8} onPress={onPress}>
        {isAvatar ? <DeleteSvg /> : <AddSvg />}
      </Styled.AvatarChangeButton>
    </Styled.BackgroundWrapper>
  );
};
