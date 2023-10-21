import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { PostCard } from '../../../../components/PostCard';

import * as Styled from './Posts.styled';
import authors from '../../../../mock/authors.json';
// import posts from '../../../../mock/posts.json';
import { SCREEN, STACK } from '../../../constants';
import { postsCollection } from '../../../../firebase/config';
import { getPaginatedPosts, getLastItem } from '../../../../firebase/services';

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
  const [posts, setPosts] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const [isEndOfPosts, setIsEndOfPosts] = useState(false);

  const fetchMore = async () => {
    if (!isEndOfPosts) {
      const morePosts = await getPaginatedPosts(lastDocument, 4);
      console.log('lastDocument: ', lastDocument);
      console.log('morePosts.docs: ', morePosts.docs);
      const postsMapped = morePosts.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
      }));
      setPosts((prevState) => [...prevState, ...postsMapped]);
      setLastDocument(getLastItem(morePosts.docs));
      setIsEndOfPosts(!morePosts.docs.length);
    }
  };

  // useEffect(() => {
  //   fetchMore();
  // }, []);

  const openComments = (item) => {
    navigation.navigate(STACK.HOME, {
      screen: SCREEN.MAIN.COMMENTS,
      params: {
        post: item,
        prevScreen: SCREEN.MAIN.POSTS,
      },
    });
  };

  const openMap = (item) => {
    navigation.navigate(STACK.HOME, {
      screen: SCREEN.MAIN.MAP,
      params: {
        post: item,
        prevScreen: SCREEN.MAIN.POSTS,
      },
    });
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
            onLocationPress={() => openMap(item)}
          />
        )}
        ListHeaderComponent={UserCard}
        keyExtractor={(post) => post._id}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMore}
      />
    </Styled.PostsContainer>
  );
};
