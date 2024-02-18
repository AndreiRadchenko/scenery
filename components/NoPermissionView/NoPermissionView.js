import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import * as Styled from './NoPermissionView.styled';

export const NoPermissionView = ({ navigation }) => {
  return (
    <Styled.CameraViewContainer>
      <Styled.ControlsWrapper>
        <Styled.BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={32} color="gray" />
        </Styled.BackButton>
        <Styled.NoAccessContainer>
          <Styled.NoAccessText>No access to camera</Styled.NoAccessText>
        </Styled.NoAccessContainer>
      </Styled.ControlsWrapper>
    </Styled.CameraViewContainer>
  );
};
