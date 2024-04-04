import { BottomMenuBuilder } from '../BottomMenuBuilder/BottomMenuBuilder';
import { onImageShare } from '../../services/shareService';
import { store } from '../../redux/store';
import { deletePostOperation } from '../../redux/posts/posts-operations';

const dispatch = store.dispatch;

export const ProfileMenu = ({ id, image, author }) => {
  return new BottomMenuBuilder()
    .addMenuItem({
      ioniconsName: 'share-social',
      text: 'Share via',
      handler: () => {
        onImageShare(image.url, id);
      },
    })
    .addMenuItem({
      ioniconsName: 'trash',
      text: 'Delete post',
      handler: () => {
        dispatch(
          deletePostOperation({
            docId: id,
            photoUrl: image.url,
          })
        );
      },
    })
    .build();
};
