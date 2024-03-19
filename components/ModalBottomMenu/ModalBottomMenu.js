import { View, StyleSheet, Text } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { PostsMenu, ProfileMenu } from '../Menu';

import { SCREEN } from '../../navigation/constants';

export const ModalBottomMenu = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ['20%', '50%'], []);

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      // opacity={0.6}
      {...props}
    />
  ));

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      // backgroundStyle={{ backgroundColor: '#1B4371' }}
    >
      {props?.screen === SCREEN.MAIN.POSTS
        ? PostsMenu({ ...props })
        : ProfileMenu({ ...props })}
    </BottomSheetModal>
  );
});
