import { BottomMenuBuilder } from '../BottomMenuBuilder/BottomMenuBuilder';

export const ProfileMenu = ({ id, image, author }) => {
  return (
    new BottomMenuBuilder()
      .addMenuItem({
        ioniconsName: 'share-social',
        text: 'Share via',
        handler: () => {
          console.log('Share image via: ', image.url);
        },
      })
      // .addMenuItem({
      //   ioniconsName: 'person',
      //   text: 'Filter by user',
      //   handler: () => {
      //     console.log('Filter by user');
      //     dismiss();
      //   },
      // })
      .addMenuItem({
        ioniconsName: 'trash',
        text: 'Delete post',
        handler: () => {
          console.log('Delete post');
        },
      })
      .build()
  );
};