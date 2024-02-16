import * as Location from 'expo-location';

import locationService from '../services/LocationNameService';
import { SCREEN, STACK } from '../navigation/constants';

export const acceptPhoto = async (hasLocationPermission, photo, navigation) => {
  try {
    if (hasLocationPermission) {
      const location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      const { address } = await locationService.getLocationName(coords);
      const { country, city, town, state, district } = address;
      navigation.navigate(SCREEN.MAIN.CREATE_POST, {
        photo,
        location: {
          ...coords,
          name: country
            ? `${town || city || district || state || ''}, ${country}`
            : '',
        },
      });
    } else {
      navigation.navigate(SCREEN.MAIN.CREATE_POST, {
        photo,
        location: { name: 'Unknown location' },
      });
    }
  } catch (e) {
    console.log(e.message);
    Alert.alert('Alert', "Can't get location name");
  }
};
