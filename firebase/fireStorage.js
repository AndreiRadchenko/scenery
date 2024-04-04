import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import uuid from 'react-native-uuid';

import { storage, avatarStorage } from '../firebase/config';

class FireStorage {
  async uploadImage({ storage, image, userId = '' }) {
    const response = await fetch(image);
    const file = await response.blob();

    const uniquePhotoId = userId ? userId : uuid.v4();
    const newImageRef = ref(storage, uniquePhotoId);
    await uploadBytes(newImageRef, file);

    const photoUrl = await getDownloadURL(newImageRef);
    return { photoUrl, uniquePhotoId };
  }

  async deleteImage(photoUrl) {
    const delImageRef = ref(storage, photoUrl);
    await deleteObject(delImageRef);
  }

  async getAvatarByUserId(uid) {
    const imageRef = ref(avatarStorage, uid);
    const photoUrl = await getDownloadURL(imageRef);
    return photoUrl;
  }
}

const fireStorage = new FireStorage();
export default fireStorage;
