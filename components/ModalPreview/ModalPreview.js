import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';

import { ImageZoom } from '../ImageZoom';

import * as Styled from './ModalPreview.styled';

export const ModalPreview = ({ modalVisible, closePreview, item }) => {
  const { image } = item ? item : { image: { url: '/' } };

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={closePreview}
      statusBarTranslucent
    >
      <Styled.ViewContainer>
        <Styled.ControlsWrapper>
          <Styled.BackButton onPress={closePreview}>
            <Ionicons name="close-outline" size={32} color="white" />
          </Styled.BackButton>
          <ImageZoom image={image} />
        </Styled.ControlsWrapper>
      </Styled.ViewContainer>
    </Modal>
  );
};
