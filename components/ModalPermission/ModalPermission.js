import React from 'react';
import { Linking, Modal, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { MainButton } from '../MainButton';

import * as Styled from './ModalPermission.styled';
import themes from '../../utils/themes';

export const ModalPermission = ({
  requiredPermission = requiredPermission || '',
  permission,
  requestPermission,
  setRequiredPermission,
  isModalVisible,
  setIsModalVisible,
}) => {
  const setButtonText = () => {
    return permission?.status === 'denied' && !permission?.canAskAgain
      ? 'Go To Settings'
      : `Request ${requiredPermission} Permission`;
  };

  const onButtonPress = async () => {
    if (permission?.status === 'denied' && !permission?.canAskAgain) {
      Linking.openSettings();
    } else {
      await requestPermission();
    }
    setIsModalVisible(false);
  };

  const onModalClose = () => {
    setRequiredPermission('');
    setIsModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isModalVisible}
      statusBarTranslucent={true}
      onRequestClose={onModalClose}
    >
      <Styled.ViewContainer>
        <Styled.ControlsWrapper>
          <Styled.BackButton onPress={onModalClose}>
            <Ionicons
              name="close-outline"
              size={32}
              color={themes.primary.colors.lightGrey}
            />
          </Styled.BackButton>
          <Styled.NoAccessContainer>
            <Styled.NoAccessText>
              No access to {requiredPermission}
            </Styled.NoAccessText>
            <MainButton buttonText={setButtonText()} onPress={onButtonPress} />
          </Styled.NoAccessContainer>
        </Styled.ControlsWrapper>
      </Styled.ViewContainer>
    </Modal>
  );
};
