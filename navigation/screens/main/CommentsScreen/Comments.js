import { useState, useEffect } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
// import { setAdjustResize, setAdjustPan } from 'rn-android-keyboard-adjust';

import { CommentCard } from '../../../../components/CommentCard';
import { InputBottomBar } from '../../../../components/InputBottomBar';

import * as Styled from './Comments.styled';
import authors from '../../../../mock/authors.json';
import { useKeyboardVisible } from '../../../../hooks';

const isPlatformIOS = Platform.OS === 'ios';

const ImageCard = ({ url }) => {
  return <Styled.ImageCard source={{ uri: url }} />;
};

export const CommentsScreen = ({ navigation, route }) => {
  const { image, comments } = route.params.post;
  const windowHeight = useWindowDimensions().height;
  const keyboardHeight = useKeyboardVisible();
  const [listHeight, setListHeight] = useState(windowHeight);

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     setAdjustResize();
  //     return () => setAdjustPan();
  //   }
  // }, []);

  useEffect(() => {
    if (windowHeight - keyboardHeight !== listHeight) {
      setListHeight(Math.round(windowHeight - keyboardHeight));
    }
  }, [windowHeight, keyboardHeight]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={isPlatformIOS ? 'padding' : null}
      keyboardVerticalOffset={isPlatformIOS ? 65 : 0}
      keyboardShouldPersistTaps="handled"
    >
      <Styled.CommentsContainer>
        <FlatList
          data={comments}
          renderItem={({ item, index }) => {
            const avatar = authors.find((e) => e._id === item.authorId);
            const isLastComment = index === comments.length - 1;
            return (
              <CommentCard
                {...item}
                index={index}
                avatar={avatar}
                isLastComment={isLastComment}
              />
            );
          }}
          ListHeaderComponent={<ImageCard url={image.url} />}
          // showsVerticalScrollIndicator={false}
          // contentContainerStyle={{
          //   flex: 1,
          //   justifyContent: 'space-between',
          // }}
          // ListFooterComponent={<InputBottomBar />}
        />
        <InputBottomBar />
      </Styled.CommentsContainer>
    </KeyboardAvoidingView>
  );
};
