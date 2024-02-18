import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import uuid from 'react-native-uuid';

import { storage } from '../firebase/config';

class FireStorage {
  async uploadImage({ storage, image }) {
    const response = await fetch(image);
    const file = await response.blob();

    const uniquePhotoId = uuid.v4();
    const newImageRef = ref(storage, uniquePhotoId);
    await uploadBytes(newImageRef, file);

    const photoUrl = await getDownloadURL(newImageRef);
    return { photoUrl, uniquePhotoId };
  }

  async deleteImage(photoUrl) {
    const delImageRef = ref(storage, photoUrl);
    await deleteObject(delImageRef);
  }
}

const fireStorage = new FireStorage();
export default fireStorage;
