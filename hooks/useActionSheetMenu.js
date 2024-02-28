import { useActionSheet } from '@expo/react-native-action-sheet';

export const useActionSheetMenu = (...args) => {
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
            break;

          case 1:
            // Choose Photo
            await args[1]();
            break;

          case cancelButtonIndex:
          // Cancel
        }
      }
    );
  };

  return showActionSheetMenu;
};
