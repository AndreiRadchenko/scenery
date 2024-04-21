import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import * as Styled from './MapScreen.styled';

export const MapScreen = ({ route }) => {
  const { location } = route.params.post;

  return (
    <Styled.MapContainer>
      <Styled.Map
        provider={PROVIDER_GOOGLE}
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
