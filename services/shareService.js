import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const onImageShare = async (imageUrl, id) => {
  try {
    const fileDetails = {
      extension: '.jpg',
      shareOptions: {
        mimeType: 'image/jpeg',
        dialogTitle: 'Check out this image!',
        UTI: 'image/jpeg',
      },
    };
    const downloadPath = FileSystem.cacheDirectory + id + fileDetails.extension;
    const { uri: localUrl } = await FileSystem.downloadAsync(
      imageUrl,
      downloadPath
    );
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Sharing is not available');
      return;
    }
    await Sharing.shareAsync(localUrl, fileDetails.shareOptions);
  } catch (error) {
    Alert.alert(error.message);
  }
};
