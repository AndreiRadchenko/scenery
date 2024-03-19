import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

import * as Styled from './BottomMenuItem.styled';

export const BottomMenuItem = ({
  ioniconsName = 'share-social-outline',
  text = 'Share via',
  handler = () => {},
}) => {
  const { dismiss } = useBottomSheetModal();

  const onMenuItemPress = () => {
    handler();
    dismiss();
  };

  return (
    <Styled.ItemWrapper>
      <Styled.Container activeOpacity={0.8} onPress={onMenuItemPress}>
        <Ionicons name={ioniconsName} size={24} color="black" />
        <Styled.ItemText>{text}</Styled.ItemText>
      </Styled.Container>
      {/* <Styled.Line /> */}
    </Styled.ItemWrapper>
  );
};
