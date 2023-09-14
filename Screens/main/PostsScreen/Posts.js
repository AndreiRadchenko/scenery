import { FlatList } from 'react-native';
import { PostCard } from '../../../components/PostCard';

import * as Styled from './Posts.styled';
import authors from '../../../mock/authors.json';
import posts from '../../../mock/posts.json';

const author = authors[1];

const UserCard = () => {
  return (
    <Styled.AuthorWrapper>
      <Styled.AuthorAvatar source={{ uri: author.avatar.url }} />
      <Styled.AuthorTextWrapper>
        <Styled.AuthorName>{author.name}</Styled.AuthorName>
        <Styled.AuthorEmail>{author.email} </Styled.AuthorEmail>
      </Styled.AuthorTextWrapper>
    </Styled.AuthorWrapper>
  );
};

export const PostsScreen = ({ navigation, route }) => {
  const openComments = (item) => {
    navigation.navigate('Comments', { post: item, prevScreen: 'Posts' });
  };
  return (
    <Styled.PostsContainer>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <PostCard
            {...item}
            index={index}
            onCommentPress={() => openComments(item)}
          />
        )}
        ListHeaderComponent={UserCard}
        keyExtractor={(post) => post._id}
        showsVerticalScrollIndicator={false}
      />
    </Styled.PostsContainer>
  );
};
