import { Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Styled from './MapScreen.styled';

const isPlatformIOS = Platform.OS === 'ios';

export const MapScreen = ({ navigation, route }) => {
  const { image, comments, location } = route.params.post;

  return (
    <Styled.MapContainer>
      <Styled.Map
        zoomEnabled
        zoomControlEnabled
        region={{
          latitude: location.latitude ? location.latitude : 37.78825,
          longitude: location.longitude ? location.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={location.name}
        />
      </Styled.Map>
    </Styled.MapContainer>
  );
};
