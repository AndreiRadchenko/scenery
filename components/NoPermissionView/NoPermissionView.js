import React from 'react';
import { Linking } from 'react-native';

import { MainButton } from '../MainButton';

import * as Styled from './NoPermissionView.styled';

export const NoPermissionView = ({
  setRequiredPermission,
  requiredPermission,
  permission,
  requestPermission,
}) => {
  const setButtonText = () => {
    return permission.status === 'denied' && !permission.canAskAgain
      ? 'Go To Settings'
      : `Request ${requiredPermission} Permission`;
  };

  const onButtonPress = async () => {
    console.log('requiredPermission: ', requiredPermission);
    if (permission.status === 'denied' && !permission.canAskAgain) {
      Linking.openSettings();
    } else {
      const permission = await requestPermission();
      if (requiredPermission === 'Camera' && permission.granted) {
        setRequiredPermission('Location');
      }
    }
  };

  return (
    <Styled.CameraViewContainer>
      <Styled.ControlsWrapper>
        <Styled.NoAccessContainer>
          <Styled.NoAccessText>
            No access to {requiredPermission}
          </Styled.NoAccessText>
          <MainButton buttonText={setButtonText()} onPress={onButtonPress} />
        </Styled.NoAccessContainer>
      </Styled.ControlsWrapper>
    </Styled.CameraViewContainer>
  );
};
