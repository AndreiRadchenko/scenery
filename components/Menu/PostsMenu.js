import { BottomMenuBuilder } from '../BottomMenuBuilder/BottomMenuBuilder';
import { onImageShare } from '../../services/shareService';

export const PostsMenu = ({ id, image, author }) => {
  return new BottomMenuBuilder()
    .addMenuItem({
      ioniconsName: 'share-social',
      text: 'Share via',
      handler: () => {
        onImageShare(image.url, id);
      },
    })
    .addMenuItem({
      ioniconsName: 'person',
      text: 'Filter by user',
      handler: () => {
        console.log('Filter by user');
      },
    })
    .build();
};
