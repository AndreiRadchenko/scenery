import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { AvatarChangeButton } from './AvatarChangeButton';

import * as Styled from './Avatar.styled';
import themes from '../../utils/themes';
import { useActionSheetMenu, useImagePickerActions } from '../../hooks';
import { updateUserDetails } from '../../redux/auth/auth-operations';

const windowWidth = Dimensions.get('window').width;

export const Avatar = ({
  user,
  getRequiredPermission,
  cameraPermission,
  mediaLibraryPermission,
  locationPermission,
}) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  const { takePhoto, pickImage, requiredPermission } = useImagePickerActions({
    setPhoto: setAvatar,
    cameraPermission,
    mediaLibraryPermission,
    locationPermission,
  });

  const showActionSheetMenu = useActionSheetMenu(takePhoto, pickImage);

  const deleteAvatar = () => {
    dispatch(updateUserDetails({ avatar: '', name: user?.nickName }));
  };

  useEffect(() => {
    getRequiredPermission(requiredPermission);
  }, [requiredPermission]);

  useEffect(() => {
    avatar && dispatch(updateUserDetails({ avatar, name: user?.nickName }));
  }, [avatar]);

  return (
    <Styled.AvatarWrapper windowWidth={windowWidth}>
      <Styled.ImageWrapper>
        {user?.avatar ? (
          <Styled.Avatar source={{ uri: user.avatar }} />
        ) : (
          <FontAwesome
            name="user-circle"
            size={74}
            color={themes.primary.colors.lightGrey}
          />
        )}
      </Styled.ImageWrapper>
      <AvatarChangeButton
        isAvatar={user?.avatar}
        onPress={!user?.avatar ? showActionSheetMenu : deleteAvatar}
      />
    </Styled.AvatarWrapper>
  );
};
