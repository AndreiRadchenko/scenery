import { FlatList } from 'react-native';
import { PostCard } from '../../../components/PostCard';

import * as Styled from './Posts.styled';
import authors from '../../../mock/authors.json';
import posts from '../../../mock/posts.json';

const author = authors[0];
const userPosts = [{ _id: '-1' }, ...posts];

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

export const PostsScreen = () => {
  return (
    <Styled.PostsContainer>
      <FlatList
        data={userPosts}
        renderItem={({ item, index }) =>
          index ? <PostCard {...item} index={index} /> : <UserCard />
        }
        keyExtractor={(post) => post._id}
        showsVerticalScrollIndicator={false}
      />
    </Styled.PostsContainer>
  );
};
