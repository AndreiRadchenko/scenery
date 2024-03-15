import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { AvatarChangeButton } from './AvatarChangeButton';
import { ModalPermission } from '../ModalPermission';

import * as Styled from './Avatar.styled';
import themes from '../../utils/themes';
import {
  useActionSheetMenu,
  useImagePickerActions,
  usePermissions,
} from '../../hooks';
import { updateUserDetails } from '../../redux/auth/auth-operations';

const windowWidth = Dimensions.get('window').width;

export const Avatar = ({ user }) => {
  const [isPermissionModalVisible, setIsPermissionModalVisible] =
    useState(false);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  const {
    cameraPermission,
    mediaLibraryPermission,
    locationPermission,
    permissionsList,
  } = usePermissions();

  const { takePhoto, pickImage, requiredPermission, setRequiredPermission } =
    useImagePickerActions({
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
    avatar && dispatch(updateUserDetails({ avatar, name: user?.nickName }));
  }, [avatar]);

  useEffect(() => {
    if (
      (requiredPermission === 'Camera' && !cameraPermission?.granted) ||
      (requiredPermission === 'Media Library' &&
        !mediaLibraryPermission?.granted)
    ) {
      setIsPermissionModalVisible(true);
    }
  }, [requiredPermission, cameraPermission, mediaLibraryPermission]);

  return (
    <>
      <ModalPermission
        isModalVisible={isPermissionModalVisible}
        setIsModalVisible={setIsPermissionModalVisible}
        requiredPermission={requiredPermission}
        setRequiredPermission={setRequiredPermission}
        permission={permissionsList[requiredPermission]?.permission}
        requestPermission={permissionsList[requiredPermission]?.request}
      />
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
    </>
  );
};
