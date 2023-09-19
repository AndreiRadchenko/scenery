import * as Styled from './PhotoPreview.styled';

export const PhotoPreview = () => {
  return (
    <Styled.CameraViewContainer>
      <Styled.ControlsWrapper>
        <Styled.BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-close-outline" size={32} color="gray" />
        </Styled.BackButton>
        <Styled.NoAccessContainer>
          <Styled.NoAccessText>No access to camera</Styled.NoAccessText>
        </Styled.NoAccessContainer>
      </Styled.ControlsWrapper>
    </Styled.CameraViewContainer>
  );
};
