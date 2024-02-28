import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export const usePermissions = () => {
  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();

  const permissionsList = {
    Camera: { request: requestCameraPermission, permission: cameraPermission },
    'Media Library': {
      request: requestMediaLibraryPermission,
      permission: mediaLibraryPermission,
    },
    Location: {
      request: requestLocationPermission,
      permission: locationPermission,
    },
  };

  return {
    cameraPermission,
    requestCameraPermission,
    mediaLibraryPermission,
    requestMediaLibraryPermission,
    locationPermission,
    requestLocationPermission,
    permissionsList,
  };
};
