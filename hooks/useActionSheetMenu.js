import { useActionSheet } from '@expo/react-native-action-sheet';
import { imagePickerService } from '../services/ImagePickerService';
import { getCurrentLocation } from '../helpers/getCurrentLocation';

export const useActionSheetMenu = (
  // {
  // setPhoto,
  // setLocation,
  // setRequiredPermission,
  // setIsLoading,
  // cameraPermission,
  // mediaLibraryPermission,
  // locationPermission,
  // }
  ...args
) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const showActionSheetMenu = () => {
    const options = ['Take Photo', 'Choose Photo', 'Cancel'];
    const destructiveButtonIndex = 3;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        showSeparators: true,
        textStyle: {
          width: '100%',
          textAlign: 'center',
        },
      },
      async (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // Take Photo
            await args[0]();
            // setRequiredPermission('Camera');
            // if (cameraPermission.granted) {
            //   setIsLoading(true);
            //   setPhoto(await imagePickerService.takePhoto());
            //   setLocation(
            //     await getCurrentLocation(locationPermission?.granted)
            //   );
            //   setIsLoading(false);
            // }
            break;

          case 1:
            // Choose Photo
            await args[1]();
            // setRequiredPermission('Media Library');
            // if (mediaLibraryPermission.granted) {
            //   setIsLoading(true);
            //   setPhoto(await imagePickerService.pickPhoto());
            //   setLocation({ name: 'Unknown location' });
            //   setIsLoading(false);
            // }
            break;

          case cancelButtonIndex:
          // Cancel
        }
      }
    );
  };

  return showActionSheetMenu;
};
