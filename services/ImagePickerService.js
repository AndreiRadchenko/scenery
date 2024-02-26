import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

class ImagePickerService {
  constructor() {
    this.isLoading = false;
    this.isGettingLocation = false;
  }

  targetHeight = 896;

  async resizeImage(photo) {
    const divider = photo.height / this.targetHeight;
    try {
      const resizedPhoto = await manipulateAsync(
        photo.uri,
        [
          {
            resize: {
              height: photo.height / divider,
              width: photo.width / divider,
            },
          },
        ],
        { compress: 0.5, format: SaveFormat.JPEG }
      );
      return resizedPhoto.uri;
    } catch (e) {
      console.log(e.message);
    }
  }

  async takePhoto() {
    this.isLoading = true;
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [16, 9],
      quality: 1,
    });
    this.isLoading = false;
    if (!result.canceled) {
      return await this.resizeImage(result.assets[0]);
    }
    return null;
  }

  async pickPhoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      // return result.assets[0].uri;
      return await this.resizeImage(result.assets[0]);
    }
    return null;
  }
}

export const imagePickerService = new ImagePickerService();
