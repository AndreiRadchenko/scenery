import React from 'react';
import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { AvatarChangeButton } from './AvatarChangeButton';

import * as Styled from './Avatar.styled';
import themes from '../../utils/themes';

const windowWidth = Dimensions.get('window').width;

export const AvatarRegistration = ({
  avatarURL,
  onCreateAvatar,
  onDeleteAvatar,
}) => {
  return (
    <Styled.AvatarWrapper windowWidth={windowWidth}>
      <Styled.ImageWrapper>
        {avatarURL ? (
          <Styled.Avatar source={{ uri: avatarURL }} />
        ) : (
          <FontAwesome
            name="user-circle"
            size={74}
            color={themes.primary.colors.lightGrey}
          />
        )}
      </Styled.ImageWrapper>
      <AvatarChangeButton
        isAvatar={avatarURL}
        onPress={!avatarURL ? onCreateAvatar : onDeleteAvatar}
      />
    </Styled.AvatarWrapper>
  );
};
