import { styled } from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';

import themes from '../../../utils/themes';

export const MapContainer = styled.View`
  flex: 1;
  /* padding: 0 16px; */
  width: 100%;
  height: 100%;
  background-color: ${themes.primary.colors.backgroundColor};
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;
