import { Ionicons } from '@expo/vector-icons';
import { StatusBar, Alert, Modal } from 'react-native';
import { ImageZoom } from '../ImageZoom';

import * as Styled from './ModalPreview.styled';

export const ModalPreview = ({ modalVisible, setModalVisible, item }) => {
  const { image } = item ? item : { image: { url: '/' } };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Styled.ViewContainer>
        <Styled.ControlsWrapper>
          <StatusBar
            barStyle="light-content" // Set the text color of the status bar (light or dark)
          />
          <Styled.BackButton onPress={() => setModalVisible(false)}>
            <Ionicons name="close-outline" size={32} color="white" />
          </Styled.BackButton>
          <ImageZoom image={image} />

          {/* <Styled.AcceptButton onPress={() => {}}>
            <Ionicons name="checkmark-sharp" size={24} color="white" />
          </Styled.AcceptButton> */}
        </Styled.ControlsWrapper>
      </Styled.ViewContainer>
    </Modal>
  );
};
