import { useState } from 'react';

import { imagePickerService } from '../services/ImagePickerService';
import { getCurrentLocation } from '../helpers/getCurrentLocation';

export const useImagePickerActions = ({
  setPhoto,
  setLocation = null,
  cameraPermission,
  mediaLibraryPermission,
  locationPermission,
}) => {
  const [requiredPermission, setRequiredPermission] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const takePhoto = async () => {
    setRequiredPermission('Camera');
    if (cameraPermission?.granted) {
      if (setLocation !== null && !locationPermission?.granted) {
        setRequiredPermission('Location');
        return;
      }

      setPhoto(await imagePickerService.takePhoto());
      setIsLocationLoading(true);
      setLocation !== null &&
        locationPermission?.granted &&
        setLocation(await getCurrentLocation(locationPermission?.granted));
      setIsLocationLoading(false);
    }
  };
  const pickImage = async () => {
    setRequiredPermission('Media Library');
    if (mediaLibraryPermission?.granted) {
      try {
        setPhoto(await imagePickerService.pickPhoto());
        setLocation !== null && setLocation({ name: 'Unknown location' });
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    }
  };

  return {
    takePhoto,
    pickImage,
    requiredPermission,
    setRequiredPermission,
    isLocationLoading,
  };
};
