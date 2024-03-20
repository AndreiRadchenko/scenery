import { BottomMenuBuilder } from '../BottomMenuBuilder/BottomMenuBuilder';
import { onImageShare } from '../../services/shareService';

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
        console.log('Delete post');
      },
    })
    .build();
};
