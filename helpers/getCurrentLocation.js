import * as Location from 'expo-location';

import locationService from '../services/LocationNameService';

export const getCurrentLocation = async (hasLocationPermission) => {
  try {
    if (hasLocationPermission) {
      const location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      const { address } = await locationService.getLocationName(coords);
      const { country, city, town, state, district } = address;
      return {
        ...coords,
        name: country
          ? `${town || city || district || state || ''}, ${country}`
          : '',
      };
    } else return { name: 'Unknown location' };
  } catch (e) {
    console.log(e.message);
    Alert.alert('Alert', "Can't get location name");
  }
};
