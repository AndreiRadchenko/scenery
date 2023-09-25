import { Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Styled from './MapScreen.styled';

const isPlatformIOS = Platform.OS === 'ios';

export const MapScreen = ({ navigation, route }) => {
  const { image, comments, location } = route.params.post;
  console.log(location);

  return (
    <Styled.MapContainer>
      <Styled.Map
        zoomEnabled
        zoomControlEnabled
        region={{
          latitude: location.latitude
            ? Number.parseFloat(location.latitude)
            : +37.78825,
          longitude: location.longitude
            ? Number.parseFloat(location.longitude)
            : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude
              ? Number.parseFloat(location.latitude)
              : +37.78825,
            longitude: location.longitude
              ? Number.parseFloat(location.longitude)
              : -122.4324,
          }}
          title={location.name}
        />
      </Styled.Map>
    </Styled.MapContainer>
  );
};
