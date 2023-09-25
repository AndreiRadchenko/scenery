import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';

import { CommentCard } from '../../../../components/CommentCard';
import { InputBottomBar } from '../../../../components/InputBottomBar';

import * as Styled from './Comments.styled';
import authors from '../../../../mock/authors.json';

const isPlatformIOS = Platform.OS === 'ios';

const ImageCard = ({ url }) => {
  return <Styled.ImageCard source={{ uri: url }} />;
};

export const CommentsScreen = ({ navigation, route }) => {
  const { image, comments } = route.params.post;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={isPlatformIOS ? 'padding' : ''}
      keyboardVerticalOffset={isPlatformIOS ? 65 : null}
    >
      <Styled.CommentsContainer>
        <FlatList
          data={comments}
          renderItem={({ item, index }) => {
            const avatar = authors.find((e) => e._id === item.authorId)?.avatar;
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
          // ListFooterComponent={<InputBottomBar />}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
        <InputBottomBar />
      </Styled.CommentsContainer>
    </KeyboardAvoidingView>
  );
};
